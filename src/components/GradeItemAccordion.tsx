import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import DelButton from './MainActionButton';

export interface GradeItemAccordionInterface {
	itemName: string;
	itemWeight?: string;
	itemGrade?: string;
	itemDueDate?: string;
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

function GradeItemAccordion({
	itemName,
	itemWeight = 'N/A',
	itemGrade = 'N/A',
	itemDueDate = 'N/A',
}: GradeItemAccordionInterface) {
	//const [itemName, setItemName] = useState('');
	//const [itemWeight, setItemWeight] = useState('');
	//const [itemGrade, setItemGrade] = useState('');
	//const [itemDueDate, setItemDueDate] = useState('');
	const [expandStatus, setStatus] = useState(false);
	const [expandArrow, setArrow] = useState('>');
	const toggleItem = () => {
		if (!expandStatus) {
			setStatus(true);
			setArrow('^');
		} else {
			setStatus(false);
			setArrow('>');
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
								value={itemName}
								onChange={(e) => {
									itemName = e.target.value;
								}}
								label="Name"
								placeholder={itemName}
							/>
						</TextContainer>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<TextContainer>
							<TextInput
								value={itemWeight}
								onChange={submit}
								label="Weight"
								placeholder={itemWeight}
							/>
						</TextContainer>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<TextContainer>
							<TextInput
								value={itemGrade}
								onChange={submit}
								label="Grade"
								placeholder={itemGrade}
							/>
						</TextContainer>
					</AccordionExtendedComponent>
					<AccordionExtendedComponent>
						<TextContainer>
							<TextInput
								value={itemDueDate}
								onChange={submit}
								label="Due Date"
								placeholder={itemDueDate}
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
						{expandArrow}
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
			{expandStatus && extended()}
		</>
	);
}

export default GradeItemAccordion;
