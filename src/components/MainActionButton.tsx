/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

export interface mainActionButtonInterface {
	text: string;
	onClick: () => void;
}

const MainButton = styled.button`
	background-color: #4961e1;
	color: white;
	font-family: Montserrat, Arial;
	font-size: 0.5em;
	padding: 1 rem 3rem;
`;

function MainActionButton({ text, onClick }: mainActionButtonInterface) {
	return <MainButton onClick={onClick}>{text}</MainButton>;
}

export default MainActionButton;
