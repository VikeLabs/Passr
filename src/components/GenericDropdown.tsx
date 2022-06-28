import React, { useRef } from 'react';
import styled from 'styled-components';
import useComponentVisible from '../hooks/useComponentVisible';
import { Link } from 'react-router-dom';

interface Props {
	buttonDisplay: React.ReactNode;
	className?: string;
}

const DropdownButton = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	border: none;
	:hover {
		border: 1px solid;
		cursor: pointer;
	}
`;

const DropdownMenu = styled.div<{ componentVisible: boolean }>`
	list-style: none;
	background-color: ${({ theme }) => theme.colors.main[0]};
	text-align: start;
	z-index: 2;
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
	border-radius: 10px;
	border-radius: 10px;
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
	padding: 0.5rem;
`;

export const ListLink = styled(Link)`
	display: block;
	text-decoration: none;
	padding: 1em;
	color: ${({ theme }) => theme.colors.text[2]};
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
`;

export const ListButton = styled.div`
	display: block;
	text-decoration: none;
	text-align: center;
	padding: 1em;
	color: ${({ theme }) => theme.colors.text[2]};
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
`;

function GenericDropdown({
	buttonDisplay,
	children,
	className,
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

	return (
		<Container ref={ref} className={className}>
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
			<DropdownMenu componentVisible={componentVisible}>
				{children}
			</DropdownMenu>
		</Container>
	);
}

export default GenericDropdown;
