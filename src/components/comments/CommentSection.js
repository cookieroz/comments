import React, { Component } from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import './CommentSection.sass'

class CommentSection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comments: [{ id: 'comment_1', name: 'testing', text: 'is this gonna work?'}],
			users: [],
		};
	}

	handleCommentSubmit(comment) {
		const comments = this.state.comments;
		comment.id = `comment_${comments.length + 1}`; // ideally this would be more robust or come from the server
		this.setState({comments: comments.concat(comment)});
	}

	loadUsers() {
		fetch('./data/UserData.json')
			.then((response) => response.json())
			.then(json => Array.isArray(json) && this.setState({users: json}))
			.catch(error => console.log(error))
	}

	componentDidMount() {
		this.loadUsers();
	}

	render() {
		return (
			<div className="comment-section">
				<h1 className="comment-section__title">Comments</h1>
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} users={this.state.users} />
				<CommentList comments={this.state.comments} />
			</div>
		)
	}
}

export default CommentSection;