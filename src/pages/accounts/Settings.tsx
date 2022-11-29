import React from 'react';
import styled from 'styled-components';
import Profile from 'molecules/Profile';
import HeaderComponent from 'components/Header';
import PersonalInfoCard from 'components/PersonalInfoCard';

const SettingsPageContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.main[1]};
	padding-bottom: 3em;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	display: grid;
	row-gap: 3em;
	grid-template-columns: 1fr 6fr 1fr;
	grid-template-rows: 4em auto;
	grid-template-areas:
		'back header account'
		'. main-content .';
`;

const SettingsContent = styled.div`
	max-width: 1440px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	grid-gap: 3em;
	grid-area: main-content;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	grid-template-areas:
		'personal personal'
		'privacy email'
		'privacy help';
	@media (max-width: 800px) {
		grid-template-rows: auto;
		grid-template-columns: 1fr;
		grid-template-areas:
			'personal'
			'privacy'
			'email'
			'help';
	}
`;

const Account = styled.div`
	grid-area: account;
`;
const Header = styled(HeaderComponent)`
	grid-area: header;
`;
const BackContainer = styled.div`
	display: flex;
	grid-area: back;
	font-size: 2em;
	color: ${(props) => props.theme.colors.primary[0]};
	background-color: ${(props) => props.theme.colors.main[0]};
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const BackButton = styled.a`
	color: inherit;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.colors.primary[1]};
	}
`;

function Settings() {
	return (
		<SettingsPageContainer>
			<BackContainer>
				<BackButton href="../">
					<i className="fas fa-angle-left"></i>
				</BackButton>
			</BackContainer>
			<Header text="Passr" />

			<SettingsContent>
				<PersonalInfoCard></PersonalInfoCard>
				{/* <PrivacyCard></PrivacyCard> */}
				{/* <EmailNotificationsCard></EmailNotificationsCard> */}
				{/* <HelpCard></HelpCard> */}
			</SettingsContent>

			<Account>
				<Profile />
			</Account>
		</SettingsPageContainer>
	);
}
export default Settings;
