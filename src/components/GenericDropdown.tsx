import React, { useRef } from 'react';
import DropdownList, { DropdownItem } from '../components/DropdownList';
import styled from 'styled-components';
import useComponentVisible from '../hooks/useComponentVisible';

interface Props {
	buttonDisplay: React.ReactNode;
	dropdownItems: DropdownItem[];
}

const DropdownButton = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px, solid, black;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

function GenericDropdown({ buttonDisplay, dropdownItems }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { isComponentVisible, setIsComponentVisible } = useComponentVisible(
		ref,
		false
	);
	const handleClick = () => {
		setIsComponentVisible(!isComponentVisible);
	};

	return (
		<Container ref={ref}>
			<DropdownButton ref={buttonRef} onClick={handleClick}>
				{buttonDisplay}
				<i
					className={
						isComponentVisible
							? 'fas fa-angle-up'
							: 'fas fa-angle-down'
					}
				/>
			</DropdownButton>
			{/* {isComponentVisible && ( */}
			<DropdownList
				buttonRef={buttonRef}
				items={dropdownItems}
				isComponentVisible={isComponentVisible}
			/>
			{/* )} */}
		</Container>
	);
}

export default GenericDropdown;
