import React from 'react';
import styled from 'styled-components';

export interface HeaderInterface {
	text: string;
}

const HeaderStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: bold;
	height: 100%;
	font-size: ${({ theme }) => theme.fontSizes.s};
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.main[0]};
	color: ${({ theme }) => theme.colors.text[1]};
`;

function Header({ text }: HeaderInterface) {
	return (
		<HeaderStyle>
			<p>{text}</p>
		</HeaderStyle>
	);
}

export default Header;
