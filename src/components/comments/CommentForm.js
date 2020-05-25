import React, {Component} from 'react';
import UserMentionTextarea from "./UserMentionTextarea";
import './CommentForm.sass';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			insertedUsers: [],
			name: '',
			text: '',
		};
		this.textareaChild = React.createRef();
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	createTextContent() {
		const text = this.state.text.trim();
		const insertedUsers = this.state.insertedUsers;
		let finalText = text;
		if (insertedUsers.length) {
			insertedUsers.forEach((user) => {
				let regex = new RegExp(user, "gi");
				let boldedText = `<strong>${user}</strong>`;
				return finalText = finalText.replace(regex, boldedText);
			})
		}
		return finalText;
	}

	handleNameChange(event) {
		const $target = event.target;
		this.setState({ name: $target.value });
	}

	handleInsertedUsersChange(insertedUsers) {
		this.setState({insertedUsers: insertedUsers});
	}

	handleSubmit(event) {
		event.preventDefault()
		if (!this.state.text) { return; }
		const name = this.state.name ? this.state.name.trim() : 'Anonymous';
		const text = this.createTextContent();
		this.props.onCommentSubmit({name, text});
		this.setState({insertedUsers: [], name: '', text: ''});
		this.textareaChild.current.resetText()
	}

	handleTextareaChange(text) {
		this.setState({text});
	}

	render() {
		return (
			<form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
				<div className="comment-form__row">
					<label className="comment-form__label">Name:</label>
					<input
						type="text"
						className="comment-form__input js-name"
						name="name"
						placeholder="Your name"
						value={this.state.name}
						onChange={this.handleNameChange.bind(this)}
					/>
				</div>
				<UserMentionTextarea ref={this.textareaChild}
				                     onInsertedUsersChange={this.handleInsertedUsersChange.bind(this)}
				                     onTextareaChange={this.handleTextareaChange.bind(this)}
				                     users={this.props.users} />
				<div className="comment-form__row">
					<input type="submit"
					       className={`comment-form__submit${!this.state.text ? ' is-disabled' : 'js-enabled'}`}
					       value="Submit" />
				</div>
			</form>
		)
	}
}

export default CommentForm;