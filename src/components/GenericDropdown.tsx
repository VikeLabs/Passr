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
	const [componentVisible, setComponentVisible] = useComponentVisible(
		ref,
		false
	);
	const handleClick = () => {
		setComponentVisible(!componentVisible);
	};

	return (
		<Container ref={ref}>
			<DropdownButton ref={buttonRef} onClick={handleClick}>
				{buttonDisplay}
				<i
					className={
						componentVisible
							? 'fas fa-angle-up'
							: 'fas fa-angle-down'
					}
				/>
			</DropdownButton>
			{componentVisible && (
				<DropdownList
					buttonRef={buttonRef}
					items={dropdownItems}
					isComponentVisible={componentVisible}
				/>
			)}
		</Container>
	);
}

export default GenericDropdown;
