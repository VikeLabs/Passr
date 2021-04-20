import React from 'react';
import Logo from '../molecules/Logo';
import styled from 'styled-components';
import ActionButton from './ActionButton';
import { Semester, Course } from '../api';
export interface SideBarInterface {
	currentSemester?: Semester;
}
const SideBarContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.primary[0]};
	height: 100%;
	width: 100%;
	justify-content: center;
	text-align: center;
	font-weight: bold;
`;
const ListOfCoursesContainer = styled.ol`
	font-size: ${({ theme }) => theme.fontSizes.m};
	padding: 0;
`;
const CourseItem = styled.li`
	color: ${({ theme }) => theme.colors.secondary[0]};
	cursor: pointer;
	padding-top: 1em;
	padding-bottom: 1em;
	list-style: none;
	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary[1]};
		color: ${({ theme }) => theme.colors.text[1]};
		list-style: none;
	}
`;
const SideBarLogo = styled(Logo)`
	background-color: ${({ theme }) => theme.colors.primary[0]};
`;
const AddCourseButtonContainer = styled.div`
	margin: 2em 1em;
	font-size: ${({ theme }) => theme.fontSizes.s};
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
			{currentSemester && (
				<CourseList courses={currentSemester.courses} />
			)}
			<AddCourseButtonContainer>
				<ActionButton onClick={AddCourse} variant="secondary">
					Add course
				</ActionButton>
			</AddCourseButtonContainer>
		</SideBarContainer>
	);
}

export default SideBar;
