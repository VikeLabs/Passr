import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBarContent from './components/SideBar';
import { Auth } from 'aws-amplify';
import HeaderComponent from './components/Header';
import Profile from 'molecules/Profile';
import { getCurrentSemester, Semester } from 'api';
import GradeBookContentContainer from './components/GradeBookContentContainer';
import GradeBookHeader from 'components/GradeBookHeader';
// todo change mock data
import { Fall2020 } from 'api/mock';

// import { readCourseItem } from './api/courseItemOperations';
import Button from './components/ActionButton';
import { useQuery } from 'react-query';

const GradeBookContainer = styled.div`
	min-height: 100vh;
	height: 100%;
	width: 100%;
	background-color: ${(props) => props.theme.colors.gray[0]};
	display: grid;
	grid-template-columns: 1fr 6fr 1fr;
	grid-template-rows: 4em auto;
	grid-template-areas:
		'sidebar header account'
		'sidebar main-content main-content';

	@media (max-width: 600px) {
		grid-template-rows: 1fr 15fr 15fr;
		grid-template-columns: 1fr 6fr 1fr;
		grid-template-areas:
			'header header account'
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
	grid-area: main-content;
	padding: 3em 3em 3em 3em;

	display: grid;
	grid-template-rows: auto auto;
	grid-template-columns: 6fr 3fr;
	grid-template-areas:
		'gradebook-header .'
		'gradebook-accordian gradebook-accordian';
`;

const Empty = styled.div`
	grid-area: empty;
`;

const AccordianContainer = styled.div`
	grid-area: gradebook-accordian;
`;

const GradebookHeaderContainer = styled.div`
	grid-area: gradebook-header;
`;

const Account = styled.div`
	grid-area: account;
	background-color: ${({ theme }) => theme.colors.main[0]};
	padding-right: 1rem;
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

	const getCourseItem = async () =>
		await fetch('/courseItem/e60e5002-9fe8-42eb-adc5-4fe9a67a9e45', {
			method: 'GET',
			headers: { userID: 'user1' }, // REMINDER: REMOVE HADRCODED USER ID
		}).then((res) => res.json());

	const query = useQuery('courseItem', getCourseItem);

	function handleClick(sem: Semester, newActiveCourse: number) {
		setCourse(newActiveCourse);
	}

	return (
		<GradeBookContainer>
			<Header text="Passr" />
			<SideBar
				currentSemester={semester}
				updateSemester={setSemester}
				activeCourse={activeCourse}
				onChange={handleClick}
			/>
			<MainContent>
				<GradebookHeaderContainer>
					<GradeBookHeader
						// todo replace mock data
						currentCourse={Fall2020.courses[0]}
					/>
				</GradebookHeaderContainer>
				<AccordianContainer>
					<GradeBookContentContainer
						// todo replace mock data
						course={Fall2020.courses[0]}
						updateCourse={(course) => course}
					/>
				</AccordianContainer>
				<Empty />
				<Button
					variant="primary"
					onClick={() => console.log(query.data)}
				>
					Read Course Item
				</Button>
			</MainContent>

			<Account>
				<Profile />
			</Account>
		</GradeBookContainer>
	);
}

export default GradeBook;
