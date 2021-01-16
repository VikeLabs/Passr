import React from 'react';
import Logo from '../molecules/Logo';
import styled from 'styled-components';
import MainActionButton, { Variant } from './MainActionButton';
import { Semester, Course } from '../api';
//import Fall2020 from '../api/mock';
export interface SideBarInterface {
	currentSemester: Semester;
}
const SideBarContainer = styled.div`
	background-color: #4961e1;
	height: 100%;
	width: 200px;
	justify-content: center;
	text-align: center;
	position: fixed;
`;
const ListOfCoursesContainer = styled.ol`
	font-size: large;
	font-weight: bold;
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
const SideBarImage = styled(Logo)`
	background-color: #4961e1;
`;

const ButtonContainer = styled.div`
	padding: 4em;
`;

function AddCourse() {
	console.log('course added');
}

function CourseList({ courses }: { courses: Course[] }) {
	return (
		<ListOfCoursesContainer>
			{courses.map((item, index) => {
				return <CourseItem key={index}>{item.name}</CourseItem>;
			})}
		</ListOfCoursesContainer>
	);
}
function SideBar({ currentSemester }: SideBarInterface) {
	return (
		<SideBarContainer>
			<SideBarImage width="4em" height="4em" />
			<CourseList courses={currentSemester.courses} />
			<MainActionButton onClick={AddCourse} variant="secondary">
				Add course
			</MainActionButton>
		</SideBarContainer>
	);
}

export default SideBar;
