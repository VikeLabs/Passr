import React, { useState, useRef } from 'react';
import DropdownList from '../components/DropdownList';
import GenericDropdown from '../components/GenericDropdown';
import styled from 'styled-components';
import useComponentVisible from '../hooks/useComponentVisible';
import '../components/Dropdown.css';

const DropdownItems = [
	{
		title: 'Profile',
		path: '/profile',
		cName: ' dropdown-link',
	},
	{
		title: 'Settings',
		path: '/settings',
		cName: ' dropdown-link',
	},
	{
		title: 'Sign Out',
		path: '/signout',
		cName: ' dropdown-link',
	},
];

const Button = styled.div`
	padding: 1em;
`;

function ProfileDropdown() {
	const ref = useRef<HTMLDivElement>(null);
	const { isComponentVisible, setIsComponentVisible } = useComponentVisible(
		ref,
		true
	);
	const handleClick = () => {
		setIsComponentVisible(!isComponentVisible);
	};

	return (
		<GenericDropdown
			buttonDisplay={
				<Button>
					<i className="fas fa-user-circle" /> {'Test'}
				</Button>
			}
			dropdownItems={DropdownItems}
		/>
	);
}

export default ProfileDropdown;
