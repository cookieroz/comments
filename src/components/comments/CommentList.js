import React, { Component } from 'react'
import './CommentList.sass'

class CommentList extends Component {
	render() {
		const comments = this.props.comments;
		let commentsListClass = 'comment-list';
		let list;
		if (comments && comments.length) {
			list = comments.map(({ name, id, text}) => (
				<div key={id} className="comment-list__comment">
					<div className="comment-list__name">{name}</div>
					<p className="comment-list__text" dangerouslySetInnerHTML={{__html: text}} />
				</div>
			));
		} else {
			let noCommentsTextClass = `${commentsListClass}__no-comments-text`
			commentsListClass = `${commentsListClass} ${commentsListClass}__no-comments`
			list = <p className={noCommentsTextClass}>no comments</p>;
		}
		return (
			<div className={commentsListClass}>
				{list}
			</div>
		)
	}
}

export default CommentList