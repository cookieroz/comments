import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './CommentList.sass'

export function CommentList({ comments }) {
  const baseCommentListClass = 'comment-list'
  const [commentsListClass, setCommentsListClass] = useState(
    baseCommentListClass
  )
  const [list, setList] = useState()

  function buildCommentListElements() {
    setCommentsListClass(baseCommentListClass)
    return comments.map(({ name, id, text }) => (
      <div key={id} className={`${baseCommentListClass}__comment`}>
        <div className={`${baseCommentListClass}__name`}>{name}</div>
        <p
          className={`${baseCommentListClass}__text`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    ))
  }

  function buildEmptyListElements() {
    const noCommentsTextClass = `${baseCommentListClass}__no-comments-text`
    setCommentsListClass(
      `${baseCommentListClass} ${baseCommentListClass}__no-comments`
    )
    return <p className={noCommentsTextClass}>no comments</p>
  }

  function buildListElements() {
    const hasComments = comments && comments.length > 0
    return hasComments ? buildCommentListElements() : buildEmptyListElements()
  }

  const listElements = useCallback(buildListElements, [comments])

  useEffect(() => setList(listElements), [listElements])

  return <div className={commentsListClass}>{list}</div>
}

export default CommentList

CommentList.propTypes = {
  comments: PropTypes.array,
}
