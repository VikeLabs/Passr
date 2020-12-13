import React, { useState, useRef } from 'react';
import DropdownList from '../components/DropdownList';
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

const DropdownButton = styled.button`
	display: inline-block;
	align-items: center;
	height: 50px;
	width: 100px;
	border: 1px, solid, black;
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
		<div ref={ref}>
			{
				<DropdownButton
					className="profile-dropdown"
					onClick={handleClick}
				>
					<i className="fas fa-user-circle" /> TEXT{' '}
					<i
						className={
							isComponentVisible
								? 'fas fa-angle-up'
								: 'fas fa-angle-down'
						}
					/>
				</DropdownButton>
			}
			{isComponentVisible && <DropdownList items={DropdownItems} />}
		</div>
	);
}

export default ProfileDropdown;
