import React, { useState } from 'react';
import Logo from '../molecules/Logo';
import styled, { css } from 'styled-components';
import ActionButton from './ActionButton';
import { Semester, Course } from '../api';
import AddCourseModal, { AddCourseData } from './AddCourseModal';
export interface SideBarInterface {
	currentSemester?: Semester;
	updateSemester: (semester: Semester) => void;
	activeCourse: number;
	onChange: (sem: Semester, newActiveCourse: number) => void;
}
export interface CourseListInterface {
	courses: Course[];
	updateItem: (courses: Course[]) => void;
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

function CourseList({ courses, updateItem }: CourseListInterface) {
	const newItem = { ...courses };
	updateItem(newItem);

	return (
		<ListOfCoursesContainer>
			{courses.map((item, name) => {
				return <CourseItem key={name}>{item.name}</CourseItem>;
			})}
		</ListOfCoursesContainer>
	);
}
function SideBar({
	currentSemester,
	updateSemester,
	activeCourse,
	onChange,
	...props
}: SideBarInterface) {
	const [modalOpen, setModalOpen] = useState(false);
	const handleModalClose = () => {
		setModalOpen(false);
	};
	function openModal() {
		setModalOpen(true);
	}
	function handleSubmit(data: AddCourseData) {
		const { name, crn, grade } = data;
		console.log(name);
		console.log(crn);
		console.log(grade);
	}
	function updateCourse(item: Course, index: number) {
		const newCourse = [...currentSemester.courses];
		newCourse[index] = item;
		updateSemester({ ...currentSemester, courses: newCourse });
	}
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
				<ActionButton onClick={openModal} variant="secondary">
					Add course
				</ActionButton>
			</AddCourseButtonContainer>
			{modalOpen && (
				<AddCourseModal
					handleSubmit={handleSubmit}
					handleClose={handleModalClose}
				/>
			)}
		</SideBarContainer>
	);
}

export default SideBar;
