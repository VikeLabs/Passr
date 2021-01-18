import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import DelButton from './MainActionButton';
import { Course, CourseItem, Fraction, getCurrentSemester } from '../api';
export interface GradeItemAccordionInterface {
	item: CourseItem;
	updateItem: (item: CourseItem) => void;
}

const Accordion = styled.tr`
	background-color: #ffffff;
	color: #4f4f4f;
	padding: 2em;
	justify-content: center;
	line-height: 8em;
	transition: line-height 14em ease-out;
	border: #ffffff;
	text-decoration: none;
	border: none;
`;
const RowComponent = styled.td`
	border: #ffffff;
	font-weight: bold;
	font-size: large;
	border: none;
	margin: 1.5em;
`;
const DropDownArrow = styled.button`
	border: none;
	outline: none;
	background-color: #ffffff;
	font-size: 2em;
`;
const AccordionExtended = styled.tr`
	font-weight: bold;
	font-size: large;
	color: #4961e1;
	border: none;
`;
const AccordionExtendedComponent = styled.td`
	background-color: #ffffff;
	border: none;
`;

const DeleteButton = styled(DelButton)`
	background-color: #ffffff;
	color: #b80f0a;
`;

const TextContainer = styled.div`
	margin: 1.5em;
`;

function submit() {
	console.log('changed');
}

function gradeToString(grade: number | Fraction | undefined) {
	if (grade == undefined) {
		return '';
	} else if (typeof grade === 'object') {
		return `${grade.numerator}/${grade.denominator}`;
	}
	return `${grade}`;
}

function parseGrade(s: string) {
	const fractionRegex = /([\d+]\.?[\d+])\/([\d+]\.?[\d+])/;
	const match = s.match(fractionRegex);
	if (!isNaN(Number(s))) {
		return Number(s);
	} else if (match) {
		return { numerator: Number(match[1]), denominator: Number(match[2]) };
	} else {
		return undefined;
	}
}

function GradeItemAccordion({ item, updateItem }: GradeItemAccordionInterface) {
	const { name, weight, grade, dueDate } = item;
	// useEffect(() => {
	// 	if (grade != tempGrade) setTempGrade(grade);
	// }, [item]);
	const [expanded, setExpanded] = useState(false);
	const [tempGrade, setTempGrade] = useState(gradeToString(grade));

	function handleChange(change: Partial<CourseItem>) {
		const newItem = { ...item, ...change };
		updateItem(newItem);
	}
	const toggleItem = () => {
		if (!expanded) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
		console.log('changed');
	};
	const extended = () => {
		return (
			<>
				<AccordionExtended>
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<RowComponent>
							<TextInput
								value={name}
								onChange={(e) => {
									handleChange({ name: e.target.value });
								}}
								label="Name"
								placeholder={name}
							/>
						</RowComponent>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<RowComponent>
							<TextInput
								value={weight?.toString() || 'N/A'}
								onChange={submit}
								label="Weight"
								placeholder="Weight"
							/>
						</RowComponent>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<RowComponent>
							<TextInput
								value={tempGrade}
								onChange={(e) => {
									setTempGrade(e.target.value);
								}}
								onBlur={() => {
									const parsedGrade = parseGrade(tempGrade);
									handleChange({ grade: parsedGrade });
								}}
								label="Grade"
								placeholder="Grade"
							/>
						</RowComponent>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<RowComponent>
							<TextInput
								value={''}
								onChange={submit}
								label="Due Date"
								placeholder="Due Date"
							/>
						</RowComponent>
					</AccordionExtendedComponent>
				</AccordionExtended>
				<AccordionExtended>
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<DeleteButton onClick={submit} variant="primary">
							Delete Item
						</DeleteButton>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent></AccordionExtendedComponent>
				</AccordionExtended>
			</>
		);
	};

	return (
		<>
			<Accordion>
				<RowComponent>
					<DropDownArrow onClick={toggleItem}>
						<i
							className={
								expanded
									? 'fas fa-angle-down'
									: 'fas fa-angle-right'
							}
						/>
					</DropDownArrow>
				</RowComponent>
				<RowComponent>
					<p>{name}</p>
				</RowComponent>
				<RowComponent>
					<p>{weight}</p>
				</RowComponent>
				<RowComponent>
					<p>{gradeToString(grade) || 'N/A'}</p>
				</RowComponent>
				<RowComponent>
					<p>{dueDate?.toDateString() || 'N/A'}</p>
				</RowComponent>
			</Accordion>
			{expanded && extended()}
		</>
	);
}

export default GradeItemAccordion;
