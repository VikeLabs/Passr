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
		<Container ref={ref}>
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
		</Container>
	);
}

export default GenericDropdown;
