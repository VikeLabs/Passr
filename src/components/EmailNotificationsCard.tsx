import React, { useState } from 'react';
import styled from 'styled-components';
import { Title, Card } from './Card';

const EmailNotificationsContainer = styled(Card)`
	grid-area: email;
`;

const Switch = styled.div`
	display: inline-block;
	font-size: 20px; /* 1 */
	height: 1em;
	width: 2em;
	background: #4961e1;
	border-radius: 1em;
	margin-right: 1em;
`;
const SwitchCircle1 = styled.div<{ enabled1: boolean }>`
	height: 1em;
	width: 1em;
	border-radius: 1em;
	background: #fff;
	box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
	transition: all 200ms ease;
	transform: ${({ enabled1 }) =>
		enabled1 ? 'translateX(1em)' : 'translateX(0px)'};
	cursor: pointer;
`;

const SwitchCircle2 = styled.div<{ enabled2: boolean }>`
	height: 1em;
	width: 1em;
	border-radius: 1em;
	background: #fff;
	box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
	transition: all 200ms ease;
	transform: ${({ enabled2 }) =>
		enabled2 ? 'translateX(1em)' : 'translateX(0px)'};
	cursor: pointer;
`;

const SwitchContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-bottom: 1em;
`;
const Content = styled.div`
	margin: 2.5em;
`;
function EmailNotificationsCard() {
	const [enabled1, setEnabled1] = useState(false);
	const [enabled2, setEnabled2] = useState(false);

	const handleClick1 = () => {
		setEnabled1(!enabled1);
	};

	const handleClick2 = () => {
		setEnabled2(!enabled2);
	};
	return (
		<EmailNotificationsContainer>
			<Content>
				<Title>Email Notifications</Title>
				<SwitchContainer>
					<Switch>
						<SwitchCircle1
							enabled1={enabled1}
							onClick={handleClick1}
						>
							{' '}
						</SwitchCircle1>
					</Switch>
					<div>Upcoming Due Dates</div>
				</SwitchContainer>
				<SwitchContainer>
					<Switch>
						<SwitchCircle2
							enabled2={enabled2}
							onClick={handleClick2}
						>
							{' '}
						</SwitchCircle2>
					</Switch>
					<div>Some other Notifications</div>
				</SwitchContainer>
			</Content>
		</EmailNotificationsContainer>
	);
}

export default EmailNotificationsCard;
