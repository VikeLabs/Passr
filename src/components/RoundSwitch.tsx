import React, { useState } from 'react';
import styled from 'styled-components';

const Switch = styled.div`
	display: inline-block;
	font-size: 20px;
	height: 1em;
	width: 2em;
	background: ${({ theme }) => theme.colors.primary[0]};
	border-radius: 1em;
	margin-right: 1em;
`;
const Circle = styled.div<{ enabled: boolean }>`
	height: 1em;
	width: 1em;
	border-radius: 1em;
	background: ${({ theme }) => theme.colors.main[0]};
	box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
	transition: all 200ms ease;
	transform: ${({ enabled }) =>
		enabled ? 'translateX(1em)' : 'translateX(0px)'};
	cursor: pointer;
`;
const SwitchContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-bottom: 1em;
`;

function RoundSwitch() {
	const [enabled, setEnabled] = useState(false);

	const handleClick = () => {
		setEnabled(!enabled);
	};

	return (
		<SwitchContainer>
			<Switch>
				<Circle enabled={enabled} onClick={handleClick}></Circle>
			</Switch>
		</SwitchContainer>
	);
}

export default RoundSwitch;
