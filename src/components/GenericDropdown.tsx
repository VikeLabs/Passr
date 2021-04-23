import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import useComponentVisible from '../hooks/useComponentVisible';
import { Link } from 'react-router-dom';

interface Props {
	buttonDisplay: React.ReactNode;
}

const DropdownButton = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px, solid, black;
`;

const DropdownMenu = styled.ul<{ componentVisible: boolean }>`
	list-style: none;
	background-color: ${({ theme }) => theme.colors.main[0]};
	text-align: start;
	z-index: 2;
	position: absolute;
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
	padding: 0;
	margin: 0;
	border-radius: 10px;
	border-radius: 0 0 10px 10px;
	visibility: ${({ componentVisible }) =>
		!componentVisible ? 'hidden' : 'visible'};
	transform: ${({ componentVisible }) =>
		!componentVisible ? 'scaleY(0)' : 'scaleY(1)'};
	transition: visibility 200ms, transform 200ms;
	transform-origin: top;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

export const ListLink = styled(Link)`
	display: block;
	height: 100%;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.text[2]};
	padding: 1em;
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
`;

export const ListButton = styled.div`
	display: block;
	height: 100%;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.text[2]};
	padding: 1em;
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
`;

function GenericDropdown({
	buttonDisplay,
	children,
}: React.PropsWithChildren<Props>) {
	const ref = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [componentVisible, setComponentVisible] = useComponentVisible(
		ref,
		false
	);
	const handleClick = () => {
		setComponentVisible(!componentVisible);
	};

	const [listTopPosition, setListTopPosition] = useState(-9999);

	useEffect(() => {
		const getMenuButtonBottom = () => {
			if (buttonRef.current != null) {
				return buttonRef.current.getBoundingClientRect().bottom;
			}
			return -9999; // Default hide the list
		};
		setListTopPosition(getMenuButtonBottom());
	}, [buttonRef]);

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
			<DropdownMenu
				style={{ top: `${listTopPosition}px` }}
				componentVisible={componentVisible}
			>
				{children}
			</DropdownMenu>
		</Container>
	);
}

export default GenericDropdown;
