import React, { useState } from 'react';
import Logo from '../molecules/Logo';
import styled, { css } from 'styled-components';
import ActionButton from './ActionButton';
import { Semester, Course } from '../api';
import AddCourseModal, { AddCourseData } from './AddCourseModal';
import AddSemesterModal, { AddSemesterData } from './AddSemesterModal';
import SemesterPicker from './SemesterPicker';

import { Fall2020, Fall2021 } from 'api/mock';
import { createSemester } from 'api/semesterOperations';

export interface SideBarInterface {
	currentSemester?: Semester;
	updateSemester: (semester: Semester) => void;
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
const AddSemesterButtonContainer = styled.div`
	margin: 2em 1em;
	font-size: ${({ theme }) => theme.fontSizes.s};
`;
const PickSemesterButtonContainer = styled.div`
	margin: 2em 1em;
	font-size: ${({ theme }) => theme.fontSizes.s};
	border-radius: 12px;
`;

function SideBar({
	currentSemester,
	updateSemester,
	activeCourse,
	onChange,
	...props
}: SideBarInterface) {
	const [courseModalOpen, setCourseModalOpen] = useState(false);
	const [semesterModalOpen, setSemesterModalOpen] = useState(false);

	const handleModalClose = () => {
		courseModalOpen
			? setCourseModalOpen(false)
			: setSemesterModalOpen(false);
	};

	const openCourseModal = () => setCourseModalOpen(true);
	const openSemesterModal = () => setSemesterModalOpen(true);

	function handleCourseSubmit(data: AddCourseData) {
		if (!currentSemester) return;
		const newCourse: Course = { ...data, courseItems: [] };
		const newCourses = [...currentSemester.courses, newCourse];
		updateSemester({ ...currentSemester, courses: newCourses });
	}

	function handleSemesterSubmit(data: AddSemesterData) {
		if (!currentSemester) return;
		const newSemester = { ...data, courses: [] };
		createSemester(newSemester);
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
				<ActionButton
					onClick={openCourseModal}
					variant="secondary"
					disabled={!currentSemester}
				>
					Add course
				</ActionButton>
			</AddCourseButtonContainer>
			{courseModalOpen && (
				<AddCourseModal
					handleSubmit={handleCourseSubmit}
					handleClose={handleModalClose}
				/>
			)}
			<AddSemesterButtonContainer>
				<ActionButton onClick={openSemesterModal} variant="secondary">
					Add Semester
				</ActionButton>
			</AddSemesterButtonContainer>
			{semesterModalOpen && (
				<AddSemesterModal
					handleSubmit={handleSemesterSubmit}
					handleClose={handleModalClose}
				/>
			)}
			<PickSemesterButtonContainer>
				<SemesterPicker
					semesters={[Fall2020, Fall2021]} //Replace mock data
					onSelect={console.log}
					current={0}
				/>
			</PickSemesterButtonContainer>
		</SideBarContainer>
	);
}

export default SideBar;
