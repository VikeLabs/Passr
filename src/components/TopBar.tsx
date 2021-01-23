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
	font-size: 1em;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.white};
	color: ${(props) => props.theme.colors.text[1]};
`;

function TopBar({ text }: TopBarInterface) {
	return (
		<TopBarStyle>
			<p>{text}</p>
		</TopBarStyle>
	);
}

export default TopBar;
