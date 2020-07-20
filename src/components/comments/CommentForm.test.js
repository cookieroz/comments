import React from 'react'
import { mount } from 'enzyme'
import CommentForm from './CommentForm'

describe('CommentForm component', () => {
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
      onCommentSubmit: jest.fn(),
      users,
    }
    wrapper = mount(<CommentForm {...params} />)
  })

  it('it renders a form', () => {
    expect(wrapper.find('.comment-form').exists()).toBe(true)
  })

  it('it renders a form with a disabled button', () => {
    expect(wrapper.find('.is-disabled').exists()).toBe(true)
  })

  it('it renders a form without a disabled button', () => {
    const $textarea = wrapper.find('.comment-form__textarea')
    $textarea.simulate('change', { target: { value: 'no mentions' } })
    expect(wrapper.find('.is-disabled').exists()).toBe(false)
  })
})
