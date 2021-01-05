import React, { useState, useRef } from 'react';
import DropdownList, { DropdownItem } from '../components/DropdownList';
import styled from 'styled-components';
import useComponentVisible from '../hooks/useComponentVisible';
import '../components/Dropdown.css';

interface Props {
	buttonDisplay: React.ReactNode;
	dropdownItems: DropdownItem[];
}

const DropdownButton = styled.button`
	display: inline-block;
	align-items: center;
	height: 50px;
	width: 100px;
	border: 1px, solid, black;
`;

function GenericDropdown({ buttonDisplay, dropdownItems, ...props }: Props) {
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
				<DropdownButton onClick={handleClick}>
					{buttonDisplay}
					<i
						className={
							isComponentVisible
								? 'fas fa-angle-up'
								: 'fas fa-angle-down'
						}
					/>
				</DropdownButton>
			}
			{isComponentVisible && <DropdownList items={dropdownItems} />}
		</div>
	);
}

export default GenericDropdown;
