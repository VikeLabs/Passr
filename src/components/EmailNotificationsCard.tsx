import React from 'react';
import styled from 'styled-components';
import { Title, Card } from './Card';
import RoundSwitch from './RoundSwitch';

const EmailNotificationsContainer = styled(Card)`
	grid-area: email;
`;

const Content = styled.div`
	margin: 2.5em;
`;
const SwitchContainer = styled.div`
	display: flex;
`;
const SwitchLabel = styled.div``;
function EmailNotificationsCard() {
	return (
		<EmailNotificationsContainer>
			<Content>
				<Title>Email Notifications</Title>
				<SwitchContainer>
					<RoundSwitch></RoundSwitch>
					<SwitchLabel>Upcoming Due Dates</SwitchLabel>
				</SwitchContainer>
				<SwitchContainer>
					<RoundSwitch></RoundSwitch>
					<SwitchLabel>Upcoming Due Dates</SwitchLabel>
				</SwitchContainer>
			</Content>
		</EmailNotificationsContainer>
	);
}

export default EmailNotificationsCard;
