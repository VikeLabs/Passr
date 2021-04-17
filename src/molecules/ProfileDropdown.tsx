import React, { useState, useEffect } from 'react';
import GenericDropdown from '../components/GenericDropdown';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { DropdownItem } from 'components/DropdownList';
import { useSignedIn } from 'hooks/useSignedIn';
import { useHistory } from 'react-router-dom';

const Button = styled.div`
	padding: 1em;
`;

function ProfileDropdown() {
	const [items, setItems] = useState<DropdownItem[]>([
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
	]);

	const { signedIn, signOut } = useSignedIn();
	const history = useHistory();

	useEffect(() => {
		if (signedIn) {
			setItems([
				...items.slice(0, 2),
				{
					title: 'Sign Out',
					action: () => {
						signOut();
					},
					icon: 'fas fa-sign-out-alt',
				},
			]);
		} else {
			setItems([
				...items.slice(0, 2),
				{
					title: 'Sign In',
					action: () => {
						history.push('/sign-in');
					},
					icon: 'fas fa-sign-out-alt',
				},
			]);
		}
	}, [signedIn]);

	return (
		<GenericDropdown
			buttonDisplay={
				<Button>
					{'"Name of User"  '}
					<i className="fas fa-user-circle" />
				</Button>
			}
			dropdownItems={items}
		/>
	);
}

export default ProfileDropdown;
