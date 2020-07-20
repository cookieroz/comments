import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './UserSuggestions.sass'

export function UserSuggestions({ users, onUserSelect }) {
  const [suggestions, setSuggestions] = useState(buildSuggestionsElements())

  function buildSuggestionsListElements() {
    return users.map(({ avatar_url, name, username }) => (
      <div
        key={username}
        className="user-card"
        onClick={() => onUserSelect({ name, username })}
      >
        <div className="user-card__avatar_url">
          <img
            className="user-card__img"
            src={avatar_url}
            alt={`avatar of ${name}`}
          />
        </div>
        <div className="user-card__details">
          {name}
          <small>{` (${username})`}</small>
        </div>
      </div>
    ))
  }

  function buildSuggestionsElements() {
    const hasUsers = users && users.length > 0
    return hasUsers ? (
      buildSuggestionsListElements()
    ) : (
      <p className="no-users">no users</p>
    )
  }

  const listElements = useCallback(buildSuggestionsElements, [users])

  useEffect(() => setSuggestions(listElements), [listElements])

  return <div className="users-list">{suggestions}</div>
}

export default UserSuggestions

UserSuggestions.propTypes = {
  users: PropTypes.array,
  onUserSelect: PropTypes.func,
}
