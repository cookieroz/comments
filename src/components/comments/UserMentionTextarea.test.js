import React from 'react';
import { mount } from 'enzyme';
import UserMentionTextarea from './UserMentionTextarea';

describe('UserMentionTextarea component', () => {
	let params;
	let wrapper;
	const users = [
		{
			"username": "bknight5",
			"avatar_url": "https://secure.gravatar.com/avatar/f04241571d95d005e4a54f4278670718?d=mm",
			"name": "Bobby Knight"
		},
		{
			"username": "ebishop6",
			"avatar_url": "https://secure.gravatar.com/avatar/5c72cdd9729a363eff338b611f582ce1?d=mm",
			"name": "Elizabeth Bishop"
		},
		{
			"username": "bwillis7",
			"avatar_url": "https://secure.gravatar.com/avatar/2a8ceb6a856e3577b6b5a7b0afc666ab?d=mm",
			"name": "Brandon Willis"
		},
		{
			"username": "gwest8",
			"avatar_url": "https://secure.gravatar.com/avatar/87bbfb3052d3f969da04c1b56cee786c?d=mm",
			"name": "Gregory West"
		},
	];

	beforeEach(() => {
		params = {
			onInsertedUsersChange: jest.fn(),
			onTextareaChange: jest.fn(),
			users
		};
		wrapper = mount(<UserMentionTextarea {...params} />);
	});

	it('it renders a textarea', () => {
		expect(wrapper.find('.comment-form__input').exists()).toBe(true);
	});

	it('it textarea change calls onTextareaChange', () => {
		const $textarea = wrapper.find('.comment-form__input');
		$textarea.simulate('change', { target: { value: 'testing this' } });
		expect(params.onTextareaChange).toHaveBeenCalled();
		expect(wrapper.state('userSearchText')).toEqual('');
		expect(wrapper.state('filteredUsers')).toEqual([]);
	});

	it('textarea does not have @ and does not filter users', () => {
		const $textarea = wrapper.find('.comment-form__input');
		$textarea.simulate('change', { target: { value: 'no mentions' } });
		expect(wrapper.state('userSearchText')).toEqual('');
		expect(wrapper.state('filteredUsers')).toEqual([]);
	});

	it('textarea has @ and filters users', () => {
		const $textarea = wrapper.find('.comment-form__input');
		$textarea.simulate('change', { target: { value: 'mention @b' } });
		expect(wrapper.state('userSearchText')).toEqual('b');
		expect(wrapper.state('filteredUsers')).not.toEqual([]);
	});
});
