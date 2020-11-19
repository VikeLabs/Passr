import React, { useState } from 'react';
import Dropdown from './Dropdown';
import './Dropdown.css';

function ProfileDropdown() {
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const handleClick = () => {
		setClick(!click);
		setDropdown(!dropdown);
	};

	return (
		<button className="profile-dropdown" onClick={handleClick}>
			<i className="fas fa-user-circle" /> TEXT{' '}
			<i className={click ? 'fas fa-angle-up' : 'fas fa-angle-down'} />
			{dropdown && <Dropdown />}
		</button>
	);
}

export default ProfileDropdown;
