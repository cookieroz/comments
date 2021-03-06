import React from 'react'
import { mount } from 'enzyme'
import CommentList from './CommentList'

describe('CommentList component', () => {
  let params
  let wrapper
  const comments = [
    { id: 'comment_1', name: 'testing', text: 'is this gonna work?' },
    {
      id: 'comment_2',
      name: 'Anonymous',
      text: '<strong>Ronald Roberts</strong> testing this out',
    },
  ]

  beforeEach(() => {
    params = { comments }
    wrapper = mount(<CommentList {...params} />)
  })

  it('it renders the comment section title', () => {
    expect(wrapper.find('.comment-list').exists()).toBe(true)
  })

  it('it renders comments', () => {
    expect(wrapper.find('.comment-list__comment').length).toBe(2)
    expect(wrapper.find('.comment-list__no-comments').exists()).toBe(false)
  })

  it('it renders no-comments', () => {
    wrapper = mount(<CommentList />)
    expect(wrapper.find('.comment-list__no-comments').exists()).toBe(true)
    expect(wrapper.find('.comment-list__comments').exists()).toBe(false)
  })
})
