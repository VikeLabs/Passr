import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBarContent from './components/SideBar';
import { Auth } from 'aws-amplify';
import HeaderComponent from './components/Header';
import ProfileDropdown from 'molecules/ProfileDropdown';
import { getCurrentSemester, Semester } from 'api';

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

const Header = styled(HeaderComponent)`
	grid-area: header;
`;

function GradeBook() {
	const [signedIn, setSignedIn] = useState(false);
	const [semester, setSemester] = useState<Semester>();
	signedIn;

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(() => {
				setSignedIn(true);
			})
			.catch(() => {
				setSignedIn(false);
			});
	}, []);

	useEffect(() => {
		// TODO - remove !signedIn when sign in is finished
		if (signedIn || !signedIn) {
			getCurrentSemester()
				.then((semester) => {
					setSemester(semester);
				})
				.catch(() => {
					console.error('Semester Not Found');
				});
		}
	}, [signedIn]);

	const [activeCourse, setCourse] = useState(0);
	console.log(setCourse);

	return (
		<GradeBookContainer>
			<Header text="Passr" />

			<SideBar
				currentSemester={semester}
				activeCourse={activeCourse}
				onChange={(sem, newActiveCourse) =>
					console.log(
						sem.courses[newActiveCourse].name + ' was clicked'
					)
				}
			/>
			<MainContent />
			<Account>
				<ProfileDropdown />
			</Account>
		</GradeBookContainer>
	);
}

export default GradeBook;
