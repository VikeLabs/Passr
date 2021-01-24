import React from 'react';
import styled from 'styled-components';

export interface TopBarInterface {
	text: string;
}

const TopBarStyle = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: bold;
	height: 3em;
	font-size: ${({ theme }) => theme.fontSizes.s};
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.main[0]};
	color: ${({ theme }) => theme.colors.text[1]};
`;

function TopBar({ text }: TopBarInterface) {
	return (
		<TopBarStyle>
			<p>{text}</p>
		</TopBarStyle>
	);
}

export default TopBar;
