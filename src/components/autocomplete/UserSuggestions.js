import React, { Component } from 'react'
import './UserSuggestions.sass'

class UserSuggestions extends Component {
	handleUserClick(userName) {
		this.props.onUserSelect(userName);
	}

	render() {
		const users = this.props.users;
		let list;
		if (users && users.length) {
			list = users.map(({ avatar_url, name, username}) => (
				<div key={username}
				     className="user-card"
				     onClick={this.handleUserClick.bind(this, {name, username})}>
					<div className="user-card__avatar_url">
						<img className="user-card__img" src={avatar_url} alt={'avatar of ' + name} />
					</div>
					<div className="user-card__details">
						{name}
						<small>{` (${username})`}</small>
					</div>
				</div>
			));
		} else {
			list = <p className="no-users">no users</p>;
		}
		return (
			<div className="users-list">
				{list}
			</div>
		);
	}
}

export default UserSuggestions;