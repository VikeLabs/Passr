import React from 'react';
import styled from 'styled-components';

export interface mainActionButtonInterface {
	children: React.ReactNode;
	onClick: () => void;
}

const MainActionButton = styled.button`
	background-color: #4961e1;
	color: white;
	font-size: 1em;
	border-radius: 6px;
	padding: 0.5rem 2rem;
	width: 100%;
	border: none;
	&:hover {
		background-color: #354bc4;
	}
`;

function MainButton({
	children,
	onClick,
	...props
}: mainActionButtonInterface) {
	return (
		<MainActionButton onClick={onClick} {...props}>
			{children}
		</MainActionButton>
	);
}

export default MainButton;
