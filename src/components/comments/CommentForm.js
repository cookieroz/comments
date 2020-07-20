import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { findBestMatch } from 'string-similarity'
import UserSuggestions from '../autocomplete/UserSuggestions'
import './CommentForm.sass'

export function CommentForm({ users, onCommentSubmit }) {
  const [filteredUsers, setFilteredUsers] = useState([])
  const [insertedUsers, setInsertedUsers] = useState([])
  const [name, setName] = useState('')
  const [savedCursorPosition, setSavedCursorPosition] = useState(0)
  const [text, setText] = useState('')
  const [userSearchText, setUserSearchText] = useState('')

  const $textarea = useRef(null)

  function resetForm() {
    setInsertedUsers([])
    setName('')
    setText('')
  }

  function userMatchesMention({ name, username, userSearchText }) {
    const nameMatch = name.toLowerCase().includes(userSearchText.toLowerCase())
    const usernameMatch = username
      .toLowerCase()
      .includes(userSearchText.toLowerCase())
    return nameMatch || usernameMatch
  }

  function filterUsers(userSearchText) {
    const filterOnType = [...users].filter(({ name, username }) =>
      userMatchesMention({ name, username, userSearchText })
    )
    setFilteredUsers(filterOnType)
  }

  function findBestMatchUserName(name, username) {
    const matchResults = findBestMatch(userSearchText, [name, username])
    return matchResults.bestMatch.target
  }

  function checkForUserMention() {
    if (!text) {
      return
    }
    const mentionRegex = /\B@\w+/g
    const shouldExtractMention = text && mentionRegex.test(text)
    if (shouldExtractMention) {
      const mention = text.match(mentionRegex)[0]
      setSavedCursorPosition(
        $textarea.current.selectionStart - 1 - mention.length
      )
      setUserSearchText(mention.replace('@', ''))
      filterUsers(userSearchText)
    }
  }

  function clearMention() {
    const deleteRangeEnd = savedCursorPosition + userSearchText.length + 1
    $textarea.current.setRangeText('', savedCursorPosition, deleteRangeEnd)
  }

  function insertInTextArea(selectedUserName) {
    const $currentTextarea = $textarea.current
    const start = savedCursorPosition
    const end = $currentTextarea.selectionEnd
    const $text = $currentTextarea.value
    clearMention()
    const before = $text.substring(0, start)
    const after = $text.substring(end, $text.length)
    $currentTextarea.value = before + selectedUserName + after
    setText(before + selectedUserName + after)
    $currentTextarea.selectionStart = $currentTextarea.selectionEnd =
      start + selectedUserName.length
    $currentTextarea.focus()
  }

  function handleUserSelect({ name, username }) {
    const bestMatchUserName = findBestMatchUserName(name, username)
    const updatedInsertedUsers = [
      ...new Set([...insertedUsers].concat(bestMatchUserName)),
    ]
    setFilteredUsers([])
    setInsertedUsers(updatedInsertedUsers)
    insertInTextArea(bestMatchUserName)
  }

  function createTextContent() {
    let finalText = text.trim()
    if (insertedUsers.length) {
      insertedUsers.forEach((user) => {
        const regex = new RegExp(user, 'gi')
        const boldedText = `<strong>${user}</strong>`
        return (finalText = finalText.replace(regex, boldedText))
      })
    }
    return finalText
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!text) {
      return
    }
    const nameToSubmit = name ? name.trim() : 'Anonymous'
    const textToSubmit = createTextContent()
    onCommentSubmit({ name: nameToSubmit, text: textToSubmit })
    resetForm()
  }

  function handleTextareaChange(event) {
    setText(event.target.value)
    checkForUserMention()
  }

  return (
    <form className="comment-form" onSubmit={(event) => handleSubmit(event)}>
      <div className="comment-form__row">
        <label htmlFor="name" className="comment-form__label">
          Name:
        </label>
        <input
          type="text"
          className="comment-form__input js-name"
          id="name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="comment-form__row">
        <label htmlFor="comment-textarea" className="comment-form__label">
          Comment:
        </label>
        <textarea
          className="comment-form__input comment-form__textarea js-textarea"
          id="comment-textarea"
          name="text"
          placeholder="Write your comment here..."
          ref={$textarea}
          value={text}
          onChange={(event) => handleTextareaChange(event)}
        />
      </div>
      <small className="comment-form__hint">
        use the &#39;@&#39; symbol to insert users
      </small>
      {!!filteredUsers.length && (
        <UserSuggestions
          users={filteredUsers}
          onUserSelect={handleUserSelect}
        />
      )}
      <div className="comment-form__row">
        <input
          type="submit"
          className={`comment-form__submit${
            !text ? ' is-disabled' : ' js-enabled'
          }`}
          value="Submit"
        />
      </div>
    </form>
  )
}

export default CommentForm

CommentForm.propTypes = {
  users: PropTypes.array,
  onCommentSubmit: PropTypes.func,
}
