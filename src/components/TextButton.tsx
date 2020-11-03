import React from 'react';
import styled from 'styled-components';

export interface textButtonInterface {
	text: string;
	onClick: () => void;
}

const ButtonStyle = styled.div`
	color: #bdbdbd;
	font-family: Montserrat, Arial;
	font-size: 14px;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

function TextButton({ text, onClick }: textButtonInterface) {
	return (
		<ButtonStyle>
			<p onClick={onClick}>{text}</p>
		</ButtonStyle>
	);
}

export default TextButton;
