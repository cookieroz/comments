import React from 'react';
import { shallow } from 'enzyme';
import CommentList from './CommentList';

describe('CommentList component', () => {
	let params;
	let wrapper;
	let comments = [
		{id: 'comment_1', name: 'testing', text: 'is this gonna work?'},
		{id: 'comment_2', name: 'Anonymous', text: '<strong>Ronald Roberts</strong> testing this out'}
	];

	beforeEach(() => {
		params = { comments}
		wrapper = shallow(<CommentList{...params} />);
	});

	it('it renders the comment section title', () => {
		expect(wrapper.find('.comment-list').exists()).toBe(true);
	});

	it('it renders comments', () => {
		expect(wrapper.find('.comment').length).toBe(2);
		expect(wrapper.find('.no-comments').exists()).toBe(false);
	});

	it('it renders no-comments', () => {
		wrapper = shallow(<CommentList />)
		expect(wrapper.find('.no-comments').exists()).toBe(true);
		expect(wrapper.find('.comments').exists()).toBe(false);
	});
});
