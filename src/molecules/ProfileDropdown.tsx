import React from 'react';
import GenericDropdown from '../components/GenericDropdown';
import styled from 'styled-components';

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
