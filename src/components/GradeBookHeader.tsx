import React, { useState } from 'react';
import styled from 'styled-components';
import { Course } from 'api';
import TextInput from './TextInput';
import HeaderGradeDisplay from './HeaderGradeDisplay';
import {
	currentGradeCalculator,
	earnedGradeCalculator,
	lostGradeCalculator,
	averageGradeNeededCalculator,
} from './GradeCalculator';
export interface GradeBookHeaderInterface {
	currentCourse: Course;
	updateCurrentCourse: (course: Course) => void;
}
const Body = styled.div`
	display: grid;
	grid-template-columns: 5fr 5fr 5fr;
	grid-template-areas: 'current
		needed
		desired';
`;
const Header = styled.div`
	color: ${({ theme }) => theme.colors.text[1]};
`;
const CourseTitle = styled.h1`
	font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CurrentGrade = styled(HeaderGradeDisplay)`
	grid-area: current;
	padding-bottom: 1em;
	padding-right: 2em;
	border-right: 1px solid ${({ theme }) => theme.colors.gray[2]};
`;
const NeededGrade = styled(HeaderGradeDisplay)`
	grid-area: needed;
	padding-left: 2em;
	padding-right: 2em;
`;
const DesiredGrade = styled(TextInput)`
	grid-area: desired;
	padding-bottom: 1em;
	min-width: 15em;
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
				<CurrentGrade
					label="Current Grade"
					grade={currentGradeCalculator(currentCourse).toFixed(2)}
				/>
				<NeededGrade
					label="Needed Grade"
					grade={averageGradeNeededCalculator(currentCourse).toFixed(
						2
					)}
				/>
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
