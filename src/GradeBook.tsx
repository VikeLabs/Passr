import React from 'react';
import styled from 'styled-components';
import SideBarContent from './components/SideBar';
import { Fall2020 } from './api/mock';

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

// Another Component File
const TheHeaderContainer = styled.div`
	background-color: cyan;
`;

function TheHeader() {
	return <TheHeaderContainer />;
}
// End of Another Component File

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
