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
	grid-template-columns: 20em 5em 20em 20em;
	grid-template-areas:
		'current'
		'line'
		'needed'
		'desired';
`;
const Header = styled.div`
	color: #002366;
`;
const CourseTitle = styled.h1`
	font-size: large;
`;

const CurrentGrade = styled(HeaderGradeDisplay)`
	grid-area: current;
`;
const Line = styled.p`
	grid-area: line;
`;
const NeededGrade = styled(HeaderGradeDisplay)`
	grid-area: needed;
`;
const DesiredGrade = styled(TextInput)`
	grid-area: desired;
`;
function GradeBookHeader({
	currentCourse,
	updateCurrentCourse,
}: GradeBookHeaderInterface) {
	const { name, crn, items, desiredGrade } = currentCourse;
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
				<Line>.</Line>
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
