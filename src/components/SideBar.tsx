import React from 'react';
import Logo from '../molecules/Logo';
import styled from 'styled-components';
import MainActionButton from './MainActionButton';
import { Semester, Course } from '../api';
export interface SideBarInterface {
	currentSemester: Semester;
}
const SideBarContainer = styled.div`
	background-color: #4961e1;
	height: 100%;
	width: 100%;
	justify-content: center;
	text-align: center;
	font-weight: bold;
`;
const ListOfCoursesContainer = styled.ol`
	font-size: large;
	padding: 0;
`;
const CourseItem = styled.li`
	color: #e5f2fc;
	cursor: pointer;
	padding-top: 1em;
	padding-bottom: 1em;
	list-style: none;
	&:hover {
		background-color: #f2f2f2;
		color: #002366;
		list-style: none;
	}
`;
const SideBarLogo = styled(Logo)`
	background-color: #4961e1;
`;
const AddCourseButtonContainer = styled.div`
	margin: 2em 1em;
	font-size: small;
`;

function AddCourse() {
	console.log('course added');
}

function CourseList({ courses }: { courses: Course[] }) {
	return (
		<ListOfCoursesContainer>
			{courses.map((item, name) => {
				return <CourseItem key={name}>{item.name}</CourseItem>;
			})}
		</ListOfCoursesContainer>
	);
}
function SideBar({ currentSemester, ...props }: SideBarInterface) {
	return (
		<SideBarContainer {...props}>
			<SideBarLogo width="8em" height="8em" />
			<CourseList courses={currentSemester.courses} />
			<AddCourseButtonContainer>
				<MainActionButton onClick={AddCourse} variant="secondary">
					Add course
				</MainActionButton>
			</AddCourseButtonContainer>
		</SideBarContainer>
	);
}

export default SideBar;
