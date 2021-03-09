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
	color: #4f4f4f;

	display: grid;
	grid-template-columns:
		minmax(75px, 1fr) minmax(200px, 5fr) minmax(200px, 5fr)
		minmax(200px, 5fr) minmax(200px, 5fr);
	grid-template-rows: 100px;
	grid-template-areas: 'arrow item weight grade duedate';
`;
const RowComponent = styled.div`
	font-weight: bold;
	font-size: large;
	border: none;

	background-color: #ffffff;
`;
const DropDownArrow = styled.button`
	border: none;
	outline: none;
	font-size: 2em;
	background-color: #ffffff;
`;
const AccordionExtended = styled.div`
	font-weight: bold;
	font-size: large;
	color: #4961e1;
	border: none;
	background-color: #ffffff;

	display: grid;
	grid-template-columns:
		minmax(75px, 1fr) minmax(200px, 5fr) minmax(200px, 5fr)
		minmax(200px, 5fr) minmax(200px, 5fr);
	grid-template-rows: 75px;
	grid-template-areas: 'arrow item weight grade duedate';
`;

const AccordionExtendedComponent = styled.div`
	border: none;
	padding-right: 25px;
`;

const DeleteButton = styled(DelButton)`
	color: #b80f0a;
	width: auto;
	font-weight: bold;
	padding-left: 5px;
	padding-right: 5px;
`;

function submit() {
	console.log('changed');
}

function monthToString(month: number) {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		case 11:
			return 'December';
	}
}

function dateToString(month: string | undefined, date: number) {
	if (month == undefined) {
		console.log('Date to String function error');
		return;
	}
	return month + ' ' + date;
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
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<RowComponent
							style={{
								gridArea: 'item',
							}}
						>
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
					<AccordionExtendedComponent>
						<RowComponent
							style={{
								gridArea: 'weight',
							}}
						>
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
					<AccordionExtendedComponent>
						<RowComponent
							style={{
								gridArea: 'grade',
							}}
						>
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
						<RowComponent
							style={{
								gridArea: 'duedate',
							}}
						>
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
					<AccordionExtendedComponent
						style={{
							gridArea: 'item',
						}}
					>
						<DeleteButton onClick={submit} variant="secondary">
							<i className="fas fa-trash"></i>
							&nbsp; &nbsp;Delete Item
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
						textAlign: 'center',
						paddingTop: '28px',
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
						paddingTop: '20px',
					}}
				>
					<p>{name}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'weight',
						paddingTop: '20px',
					}}
				>
					<p>{`${weight} %`}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'grade',
						paddingTop: '20px',
					}}
				>
					<p>{gradeToString(grade) || 'N/A'}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'duedate',
						paddingTop: '20px',
					}}
				>
					<p>
						{dueDate
							? dateToString(monthToString(dueDate.getMonth()),dueDate.getDate()) // prettier-ignore
							: 'N/A'}
					</p>
				</RowComponent>
			</Accordion>
			{expanded && extended()}
			<br></br>
		</>
	);
}

export default GradeItemAccordion;
