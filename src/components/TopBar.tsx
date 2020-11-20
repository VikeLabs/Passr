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
	letter-spacing: 0.2px;
	text-align: center;
	background: #ffffff;
	color: #002366;
`;

function TopBar({ text }: TopBarInterface) {
	return (
		<TopBarStyle>
			<p>{text}</p>
		</TopBarStyle>
	);
}

export default TopBar;
