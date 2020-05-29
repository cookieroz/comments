import React, {Component} from "react";
import {findBestMatch} from "string-similarity";
import UserSuggestions from "../autocomplete/UserSuggestions";

export class UserMentionTextarea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredUsers: [],
			insertedUsers: [],
			savedCursorPosition: null,
			selectedUser: '',
			text: '',
			userSearchText: ''
		};
		this.commentText = React.createRef();
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	checkForUserMention(text) {
		if (!text) { return; }
		const mentionRegex = /\B@\w+/g;
		const shouldExtractMention = text && mentionRegex.test(text);
		if (shouldExtractMention) {
			const mention = text.match(mentionRegex)[0];
			const userSearchText = mention.replace('@', '');
			const $textarea = this.commentText.current;
			const savedCursorPosition = $textarea.selectionStart - mention.length;
			this.setState({savedCursorPosition, userSearchText});
			this.filterUsers(userSearchText);
		}
	}

	clearMention($textarea, start) {
		const deleteRangeEnd = start + this.state.userSearchText.length + 1;
		$textarea.setRangeText('', start, deleteRangeEnd);
	}

	filterUsers(userSearchText) {
		const users = this.props.users;
		const filteredUsers = users.filter(({name, username}) => this.userMatchesMention({name, username, userSearchText}));
		this.setState({filteredUsers});
	}

	findBestMatchUserName(name, username) {
		const matchResults = findBestMatch(this.state.userSearchText, [name, username]);
		return matchResults.bestMatch.target;
	}

	handleInputChange(event) {
		const $target = event.target;
		this.setState({text: $target.value});
		this.checkForUserMention($target.value);
		this.props.onTextareaChange($target.value);
	}

	handleUserSelect({name, username}) {
		const selectedUser = this.findBestMatchUserName(name, username);
		let insertedUsers = [...this.state.insertedUsers].concat(selectedUser)
		insertedUsers =[...new Set(insertedUsers)]
		this.setState({filteredUsers: [], insertedUsers, selectedUser}, this.insertInTextArea);
		this.props.onInsertedUsersChange(insertedUsers);
	}

	insertInTextArea() {
		const selectedUserName = this.state.selectedUser;
		const $textarea = this.commentText.current;
		const start = this.state.savedCursorPosition;
		const end = $textarea.selectionEnd;
		const text = $textarea.value;
		this.clearMention($textarea, start);
		const before = text.substring(0, start);
		const after = text.substring(end, text.length);
		$textarea.value = (before + selectedUserName + after);
		$textarea.selectionStart = $textarea.selectionEnd = start + selectedUserName.length;
		$textarea.focus();
	}

	resetText() {
		this.setState({insertedUsers: [], selectedUser: '', text: ''});
	}

	userMatchesMention({name, username, userSearchText}) {
		const nameMatch = name.toLowerCase().includes(userSearchText.toLowerCase());
		const usernameMatch = username.toLowerCase().includes(userSearchText.toLowerCase());
		return nameMatch || usernameMatch;
	}

	render() {
		const filteredUsers = this.state.filteredUsers;
		return (
			<React.Fragment>
				<div className="comment-form__row">
					<label htmlFor="comment-textarea"
					       className="comment-form__label">Comment:</label>
					<textarea
						className="comment-form__input js-textarea"
						id="comment-textarea"
						name="text"
						placeholder="Write your comment here..."
						ref={this.commentText}
						value={this.state.text}
						onBlur={this.handleInputChange.bind(this)}
						onChange={this.handleInputChange.bind(this)}
					/>
				</div>
				<small className="comment-form__hint">use the '@' symbol to insert users</small>
				{
					!!filteredUsers.length && <UserSuggestions
						users={filteredUsers}
						onUserSelect={this.handleUserSelect.bind(this)}/>
				}
			</React.Fragment>
		)
	}
}

export default UserMentionTextarea;