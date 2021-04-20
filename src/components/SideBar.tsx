import React from 'react';
import Logo from '../molecules/Logo';
import styled, { css } from 'styled-components';
import ActionButton from './ActionButton';
import { Semester } from '../api';

export interface SideBarInterface {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	currentSemester?: Semester;
	activeCourse: number;
	onChange: (sem: Semester, newActiveCourse: number) => void;
=======
	currentSemester?: Semester | undefined;
>>>>>>> 44e1a1c (merged with master to fix build issue)
=======
	currentSemester?: Semester;
>>>>>>> 5241f5c (merged with master to fix build issue 2.0)
=======
	currentSemester?: Semester | undefined;
>>>>>>> 75f6a2c (merged with master to fix build issue)
=======
	currentSemester?: Semester;
>>>>>>> 05b0cbc (merged with master to fix build issue 2.0)
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
	padding-top: 0.75em;
	padding-bottom: 0.75em;
	margin-top: 0.25em;
	margin-bottom: 0.25em;
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
	return (
		<SideBarContainer {...props}>
			<SideBarLogo width="8em" height="8em" />
			{currentSemester && (
				<ListOfCoursesContainer>
					{currentSemester.courses.map((item, name) => {
						return (
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
