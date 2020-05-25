import React, { Component } from 'react'
import './CommentList.sass'

class CommentList extends Component {
	render() {
		const comments = this.props.comments;
		let list;
		if (comments && comments.length) {
			list = comments.map(({ name, id, text}) => (
				<div key={id} className="comment">
					<div className="comment__name">{name}</div>
					<p className="comment__text" dangerouslySetInnerHTML={{__html: text}} />
				</div>
			));
		} else {
			list = <p className="no-comments">no comments</p>;
		}
		return (
			<div className="comment-list">
				{list}
			</div>
		)
	}
}

export default CommentList