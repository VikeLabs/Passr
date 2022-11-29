import React from 'react';
import styled from 'styled-components';
import { Title, Card } from './Card';

const HelpCardContainer = styled(Card)`
	grid-area: help;
`;
const Content = styled.div`
	margin: 2.5em;
`;
const ContactUsLink = styled.sub`
	margin-left: 0.5em;
`;

const LinkContainer = styled.a`
	color: ${(props) => props.theme.colors.primary[0]};
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.colors.primary[1]};
	}
	display: flex;
	align: center;
`;

function HelpCard() {
	return (
		<HelpCardContainer>
			<Content>
				<Title>Help</Title>
				<LinkContainer href="/contact">
					<i className="fas fa-external-link-alt"></i>
					<ContactUsLink>Contact Us</ContactUsLink>
				</LinkContainer>
			</Content>
		</HelpCardContainer>
	);
}

export default HelpCard;
