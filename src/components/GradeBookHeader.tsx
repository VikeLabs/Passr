import React, { useState } from 'react';
import styled from 'styled-components';
import { Course } from 'api';
import TextInput from './TextInput';
import HeaderGradeDisplay from './HeaderGradeDisplay';
export interface GradeBookHeaderInterface {
	currentCourse: Course;
	updateCurrentCourse: (course: Course) => void;
}
const Body = styled.div`
	display: grid;
	grid-template-columns: 5fr 1fr 5fr 5fr;
	grid-template-areas: 'current
		.
		needed
		desired';
`;
const Header = styled.div`
	color: ${({ theme }) => theme.colors.text[1]};
	padding: 4em 3em 3em 3em;
`;
const CourseTitle = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CurrentGrade = styled(HeaderGradeDisplay)`
	grid-area: current;
	padding-bottom: 1em;
	border-right: 1px solid ${({ theme }) => theme.colors.gray[1]};
`;
const NeededGrade = styled(HeaderGradeDisplay)`
	grid-area: needed;
`;
const DesiredGrade = styled(TextInput)`
	grid-area: desired;
	padding-bottom: 1em;
`;
function GradeBookHeader({
	currentCourse,
	updateCurrentCourse,
}: GradeBookHeaderInterface) {
	const { name, desiredGrade } = currentCourse;
	const [tempDesiredGrade, setTempDesiredGrade] = useState(
		desiredGrade?.toString() || ''
	);
	function handleChange(change: Partial<Course>) {
		const newCourse = { ...currentCourse, ...change };
		updateCurrentCourse(newCourse);
	}
	return (
		<Header>
			<CourseTitle>{name}</CourseTitle>
			<Body>
				<CurrentGrade label="Current Grade" grade="" />
				<NeededGrade label="Needed Grade" grade="" />
				<DesiredGrade
					value={tempDesiredGrade}
					onChange={(e) => {
						setTempDesiredGrade(e.target.value);
					}}
					onBlur={() => {
						handleChange({
							desiredGrade: isNaN(Number(tempDesiredGrade))
								? undefined
								: Number(tempDesiredGrade),
						});
					}}
					label="Desired Grade"
					placeholder="Desired Grade"
				/>
			</Body>
		</Header>
	);
}

export default GradeBookHeader;
