import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import DelButton from './MainActionButton';
import { CourseItem, Fraction } from '../api';
export interface GradeItemAccordionInterface {
	item: CourseItem;
	updateItem: (item: CourseItem) => void;
}

const Accordion = styled.tr`
	background-color: #ffffff;
	color: #4f4f4f;
	padding: 2em;
	justify-content: center;
	line-height: 14em;
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
/*
css`
	td, tr, th {
		border: none;
	}
`
*/

function submit() {
	console.log('changed');
}

function gradeToString(grade: number | Fraction | undefined) {
	return '';
}
/*
function GradeItemAccordionExtended({
	itemName,
	itemWeight='N/A',
	grade='N/A',
	dueDate='N/A',
}: GradeItemAccordionExtended) {
	return (
		<AccordionExtended>
			<AccordionExtendedComponent></AccordionExtendedComponent>
			<AccordionExtendedComponent>
				<TextInput value={itemName} onChange={submit} label="Name" />
			</AccordionExtendedComponent>
			<AccordionExtendedComponent>
				<TextInput
					value={itemWeight}
					onChange={submit}
					label="Weight"
				/>
			</AccordionExtendedComponent>
			<AccordionExtendedComponent>
				<TextInput value={grade} onChange={submit} label="Grade" />
			</AccordionExtendedComponent>
			<AccordionExtendedComponent>
				<TextInput value={dueDate} onChange={submit} label="Due Date" />
			</AccordionExtendedComponent>
		</AccordionExtended>
	);
}
*/

function GradeItemAccordion({ item, updateItem }: GradeItemAccordionInterface) {
	const { name, weight, grade, dueDate } = item;

	// useEffect(() => {
	// 	if (grade != tempGrade) setTempGrade(grade);
	// }, [item]);
	const [expanded, setExpanded] = useState(false);
	const [tempGrade, setTempGrade] = useState(grade);

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
						<TextContainer>
							<TextInput
								value={name}
								onChange={(e) => {
									// name = e.target.value;
									handleChange({ name: e.target.value });
								}}
								label="Name"
								placeholder={name}
							/>
						</TextContainer>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<TextContainer>
							<TextInput
								value={weight?.toString() || ''}
								onChange={submit}
								label="Weight"
								placeholder="Weight"
							/>
						</TextContainer>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<TextContainer>
							<TextInput
								value={gradeToString(grade)}
								onChange={(e) => {
									let grade: number | Fraction = Number(
										e.target.value
									);
									if (isNaN(grade)) {
										// Get numerator and denominator using a regex expression
										// If the regex fails, we should
									}
									// Call a setTempGrade
								}}
								onBlur={() => {
									// Validate tempGrade is valid
									// Call the handleChage
									handleChange({ grade: tempGrade });
								}}
								label="Grade"
								placeholder="Grade"
							/>
						</TextContainer>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<TextContainer>
							<TextInput
								value={''}
								onChange={submit}
								label="Due Date"
								placeholder="Due Date"
							/>
						</TextContainer>
					</AccordionExtendedComponent>
				</AccordionExtended>
				<AccordionExtended>
					<AccordionExtendedComponent></AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<DeleteButton onClick={submit}>
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
						{expanded ? '^' : '>'}
					</DropDownArrow>
				</RowComponent>
				<RowComponent>
					<p>{itemName}</p>
				</RowComponent>
				<RowComponent>
					<p>{itemWeight}</p>
				</RowComponent>
				<RowComponent>
					<p>{itemGrade}</p>
				</RowComponent>
				<RowComponent>
					<p>{itemDueDate}</p>
				</RowComponent>
			</Accordion>
			{expanded && extended()}
		</>
	);
}

export default GradeItemAccordion;
