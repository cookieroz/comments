import React, { useEffect, useState } from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import './CommentSection.sass'

export function CommentSection() {
  const [comments, setComments] = useState([])
  const [errorText, setErrorText] = useState('')
  const [users, setUsers] = useState([])

  function handleCommentSubmit(commentToUpdate) {
    commentToUpdate.id = `comment_${comments.length + 1}`
    setComments(comments.concat(commentToUpdate))
  }

  useEffect(() => {
    fetch('./data/UserData.json')
      .then((response) => response.json())
      .then((json) => Array.isArray(json) && setUsers(json))
      .catch((error) => setErrorText(`error loading users: ${error}`))
  }, [])

  return (
    <section className="comment-section">
      <h1 className="comment-section__title">Comments</h1>
      {!!errorText && <small>{errorText}</small>}
      <CommentForm onCommentSubmit={handleCommentSubmit} users={users} />
      <CommentList comments={comments} />
    </section>
  )
}

export default CommentSection
