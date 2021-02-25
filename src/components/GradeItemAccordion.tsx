import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import DelButton from './MainActionButton';
import { CourseItem, Fraction } from 'api';
export interface GradeItemAccordionInterface {
	item: CourseItem;
	updateItem: (item: CourseItem) => void;
}

const Accordion = styled.div`
	background-color: #ffffff;
	color: #4f4f4f;

	display: grid;
	grid-template-columns: 1fr 5fr 5fr 5fr 5fr;
	grid-template-areas: 'arrow item weight grade duedate';
`;
const RowComponent = styled.div`
	border: #ffffff;
	font-weight: bold;
	font-size: large;
	border: none;
`;
const DropDownArrow = styled.button`
	border: none;
	outline: none;
	background-color: #ffffff;
	font-size: 2em;
`;
const AccordionExtended = styled.div`
	font-weight: bold;
	font-size: large;
	color: #4961e1;
	border: none;
`;
const AccordionExtendedComponent = styled.div`
	background-color: #ffffff;
	border: none;
`;

const DeleteButton = styled(DelButton)`
	background-color: #ffffff;
	color: #b80f0a;
	margin-right: 2em;
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
	const fractionRegex = /([\d]*\.?[\d]+)\/([\d]*\.?[\d]+)/;
	const match = s.match(fractionRegex);
	console.log({ parseGradeMatch: match });
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
	const [expanded, setExpanded] = useState(false);
	const [tempName, setTempName] = useState(name);
	const [tempWeight, setTempWeight] = useState(weight?.toString() || '');
	const [tempGrade, setTempGrade] = useState(gradeToString(grade));
	const [tempDate, setTempDate] = useState('');

	function handleChange(change: Partial<CourseItem>) {
		const newItem = { ...item, ...change };
		updateItem(newItem);
	}

	const extended = () => {
		return (
			<>
				<AccordionExtended>
					<AccordionExtendedComponent
						style={{
							gridArea: 'arrow',
						}}
					></AccordionExtendedComponent>
					<AccordionExtendedComponent
						style={{
							gridArea: 'item',
						}}
					>
						<RowComponent>
							<TextInput
								value={tempName}
								onChange={(e) => {
									setTempName(e.target.value);
								}}
								onBlur={() => {
									handleChange({ name: tempName });
								}}
								label="Name"
								placeholder="Name"
							/>
						</RowComponent>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent
						style={{
							gridArea: 'weight',
						}}
					>
						<RowComponent>
							<TextInput
								value={tempWeight}
								onChange={(e) => {
									setTempWeight(e.target.value);
								}}
								onBlur={() => {
									handleChange({
										weight: isNaN(Number(tempWeight))
											? undefined
											: Number(tempWeight),
									});
								}}
								label="Weight"
								placeholder="Weight"
							/>
						</RowComponent>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent
						style={{
							gridArea: 'grade',
						}}
					>
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
					<AccordionExtendedComponent
						style={{
							gridArea: 'duedate',
						}}
					>
						<RowComponent>
							<TextInput
								value={tempDate}
								onChange={(e) => {
									setTempDate(e.target.value);
								}}
								onBlur={() => {
									handleChange({
										dueDate: new Date(tempDate),
									});
								}}
								label="Due Date"
								placeholder="Due Date"
							/>
						</RowComponent>
					</AccordionExtendedComponent>
				</AccordionExtended>
				<AccordionExtended>
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<DeleteButton onClick={submit} variant="negative">
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
				<RowComponent
					style={{
						gridArea: 'arrow',
					}}
				>
					<DropDownArrow onClick={() => setExpanded(!expanded)}>
						<i
							className={
								expanded
									? 'fas fa-angle-down'
									: 'fas fa-angle-right'
							}
						/>
					</DropDownArrow>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'item',
					}}
				>
					<p>{name}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'weight',
					}}
				>
					<p>{weight}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'grade',
					}}
				>
					<p>{gradeToString(grade) || 'N/A'}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'duedate',
					}}
				>
					<p>{dueDate?.toDateString() || 'N/A'}</p>
				</RowComponent>
			</Accordion>
			{expanded && extended()}
		</>
	);
}

export default GradeItemAccordion;
