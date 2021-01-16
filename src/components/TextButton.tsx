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

function TextButton({ text, onClick, ...props }: TextButtonInterface) {
	return (
		<ButtonStyle onClick={onClick} {...props}>
			{text}
		</ButtonStyle>
	);
}

export default TextButton;
