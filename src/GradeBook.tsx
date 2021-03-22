import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBarContent from './components/SideBar';
import { Fall2020 } from './api/mock';
import { Auth } from 'aws-amplify';
import HeaderComponent from './components/Header';
import ProfileDropdown from 'molecules/ProfileDropdown';

export let signInStatus = false;

const GradeBookContainer = styled.div`
	height: 100vh;
	width: 100%;
	background-color: orange;
	display: grid;
	grid-template-columns: 1fr 6fr 1fr;
	grid-template-rows: 4fr 59fr;
	grid-template-areas:
		'sidebar header account'
		'sidebar main-content main-content';

	@media (max-width: 600px) {
		grid-template-rows: 1fr 15fr;
		grid-template-columns: 1fr 6fr 1fr;
		grid-template-areas:
			'logo header account'
			'main-content main-content main-content';
	}
`;

const SideBar = styled(SideBarContent)`
	grid-area: sidebar;
	@media (max-width: 600px) {
		display: none;
	}
`;

const MainContent = styled.div`
	background-color: blue;
	grid-area: main-content;
`;

const Account = styled.div`
	grid-area: account;
`;

const Header = styled(HeaderComponent)`
	grid-area: header;
`;

function GradeBook() {
	const [signedIn, setSignedIn] = useState(false);
	signedIn;

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(() => {
				setSignedIn(true);
				signInStatus = signedIn;
			})
			.catch(() => {
				setSignedIn(false);
				signInStatus = signedIn;
			});
	});

	return (
		<GradeBookContainer>
			<Header text="Passr" />
			<SideBar currentSemester={Fall2020} />
			<MainContent />
			<Account>
				<ProfileDropdown />
			</Account>
		</GradeBookContainer>
	);
}

export default GradeBook;
