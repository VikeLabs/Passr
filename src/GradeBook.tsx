import React from 'react';
import styled from 'styled-components';
import SideBarContent from './components/SideBar';
import { Fall2020 } from './api/mock';
<<<<<<< HEAD
=======
import { Auth } from 'aws-amplify';
import ActionButton from 'components/ActionButton';
>>>>>>> e29fd314b11058a92974f1596bf1c178bc93af4f

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
	background-color: magenta;
`;

<<<<<<< HEAD
=======
const SignOutButton = styled(ActionButton)`
margin 0.5em;
`;

>>>>>>> e29fd314b11058a92974f1596bf1c178bc93af4f
const Header = styled.div`
	grid-area: header;
`;

function GradeBook() {
	return (
		<GradeBookContainer>
			<Header />
			<SideBar currentSemester={Fall2020} />
			<MainContent />
			<Account />
		</GradeBookContainer>
	);
}

export default GradeBook;
