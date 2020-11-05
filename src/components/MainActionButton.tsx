import React from 'react';
import styled from 'styled-components';

export interface mainActionButtonInterface {
	text: string;
	onClick: () => void;
}

const MainButton = styled.button`
	background-color: #4961e1;
	color: white;
	font-size: 1em;
	border-radius: 6px;
	padding: 0.5rem 2rem;
`;

function MainActionButton({ text, onClick }: mainActionButtonInterface) {
	return <MainButton onClick={onClick}>{text}</MainButton>;
}

export default MainActionButton;
