import React from 'react';
import Logo from '../molecules/Logo';
import styled, { css } from 'styled-components';
import ActionButton from './ActionButton';
import { Semester } from '../api';

export interface SideBarInterface {
	currentSemester?: Semester;
	activeCourse: number;
	onChange: (sem: Semester, newActiveCourse: number) => void;
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
const CourseItem = styled.li<{ selected: boolean }>`
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
	${(props) =>
		props.selected &&
		css`
			background-color: ${({ theme }) => theme.colors.secondary[1]};
			color: ${({ theme }) => theme.colors.text[1]};
		`}
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

function SideBar({
	currentSemester,
	activeCourse,
	onChange,
	...props
}: SideBarInterface) {
	currentSemester &&
		console.log(
			'active course is: ' + currentSemester.courses[activeCourse].name
		);

	return (
		<SideBarContainer {...props}>
			<SideBarLogo width="8em" height="8em" />
			{currentSemester && (
				<ListOfCoursesContainer>
					{currentSemester.courses.map((item, name) => {
						console.log(currentSemester.courses.indexOf(item));
						console.log(activeCourse);
						console.log(
							activeCourse ===
								currentSemester.courses.indexOf(item)
						);
						return (
							// need to check if the item is the active course item or not
							<CourseItem
								key={name}
								onClick={() =>
									onChange(
										currentSemester,
										currentSemester.courses.indexOf(item)
									)
								}
								selected={
									activeCourse ===
									currentSemester.courses.indexOf(item)
								}
							>
								{item.name}
							</CourseItem>
						);
					})}
				</ListOfCoursesContainer>
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
