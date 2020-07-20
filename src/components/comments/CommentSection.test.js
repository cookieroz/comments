import React from 'react'
import { shallow } from 'enzyme'
import CommentSection from './CommentSection'

describe('CommentSection component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CommentSection />)
  })

  it('it renders the comment section title', () => {
    expect(wrapper.find('.comment-section__title').text()).toBe('Comments')
  })
})
