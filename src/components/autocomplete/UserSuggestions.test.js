import React from 'react'
import { shallow } from 'enzyme'
import UserSuggestions from './UserSuggestions'

describe('UserSuggestions component', () => {
  let params
  let wrapper
  const users = [
    {
      username: 'bknight5',
      avatar_url:
        'https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm',
      name: 'Bobby Knight',
    },
    {
      username: 'ebishop6',
      avatar_url:
        'https://secure.gravatar.com/avatar/5c72cdd9729a363eff338b611f582ce1?d=mm',
      name: 'Elizabeth Bishop',
    },
    {
      username: 'bwillis7',
      avatar_url:
        'https://secure.gravatar.com/avatar/2a8ceb6a856e3577b6b5a7b0afc666ab?d=mm',
      name: 'Brandon Willis',
    },
    {
      username: 'gwest8',
      avatar_url:
        'https://secure.gravatar.com/avatar/87bbfb3052d3f969da04c1b56cee786c?d=mm',
      name: 'Gregory West',
    },
  ]

  beforeEach(() => {
    params = {
      onUserSelect: jest.fn(),
      users,
    }
    wrapper = shallow(<UserSuggestions {...params} />)
  })

  it('it renders .users-list', () => {
    expect(wrapper.find('.users-list').exists()).toBe(true)
  })

  it('it renders users', () => {
    expect(wrapper.find('.user-card').length).toBe(4)
    expect(wrapper.find('.no-users').exists()).toBe(false)
  })

  it('it renders no-users', () => {
    wrapper = shallow(<UserSuggestions />)
    expect(wrapper.find('.no-users').exists()).toBe(true)
    expect(wrapper.find('.user-card').exists()).toBe(false)
  })
})
