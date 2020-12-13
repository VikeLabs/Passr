import React, { useState } from 'react';
import DropdownList from '../components/DropdownList';
import styled from 'styled-components';
import useComponentVisible from '../components/useComponentVisible';
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

const { ref, isComponentVisible } = useComponentVisible(true);

const DropdownButton = styled.button`
	display: inline-block;
	align-items: center;
	height: 50px;
	width: 100px;
	border: 1px, solid, black;
`;

function ProfileDropdown() {
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const handleClick = () => {
		setClick(!click);
		setDropdown(!dropdown);
	};

	return (
		<div ref={ref}>
			{isComponentVisible && (
				<DropdownButton
					className="profile-dropdown"
					onClick={handleClick}
				>
					<i className="fas fa-user-circle" /> TEXT{' '}
					<i
						className={
							click ? 'fas fa-angle-up' : 'fas fa-angle-down'
						}
					/>
				</DropdownButton>
			)}
			{dropdown && <DropdownList items={DropdownItems} />}
		</div>
	);
}

export default ProfileDropdown;
