import React from 'react';
import GenericDropdown from '../components/GenericDropdown';
import styled from 'styled-components';
import { signInStatus } from '../GradeBook';

const DropdownItems = [
	{
		title: 'Profile',
		path: '/profile',
		icon: 'fas fa-user-circle',
	},
	{
		title: 'Settings',
		path: '/settings',
		icon: 'fas fa-cog',
	},
	{
		title: 'Sign Out',
		path: '/signout',
		icon: 'fas fa-sign-out-alt',
	},
];

const Button = styled.div`
	padding: 1em;
`;

function ProfileDropdown() {
	if (signInStatus) {
		DropdownItems[2].title = 'Sign Out';
		DropdownItems[2].path = '/signout';
	} else {
		DropdownItems[2].title = 'Sign In';
		DropdownItems[2].path = '/signin';
	}
	return (
		<GenericDropdown
			buttonDisplay={
				<Button>
					{'"Name of User"  '}
					<i className="fas fa-user-circle" />
				</Button>
			}
			dropdownItems={DropdownItems}
		/>
	);
}

export default ProfileDropdown;
