import React from 'react';
import styled from 'styled-components';

export interface TextButtonInterface {
	text: string;
	onClick: () => void;
}

const ButtonStyle = styled.div`
	color: #bdbdbd;
	font-size: 1em;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

function TextButton({ text, onClick }: TextButtonInterface) {
	return (
		<ButtonStyle onClick={onClick}>
			<p>{text}</p>
		</ButtonStyle>
	);
}

export default TextButton;
