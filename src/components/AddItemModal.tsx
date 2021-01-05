import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultModal, { ButtonField } from './DefaultModal';
import Logo from '../molecules/Logo';
import TextInput from './TextInput';
import CancelButton from './CancelButton';
import MainButton from './MainActionButton';

const Body = styled.div`
	height: 20em;
`;

const Desc = styled.p`
	color: black;
	font-size: 14px;
`;

const BodyLogo = styled.div`
	grid-area: logo;
	justify-content: center;
	align-items: center;
`;

const InputField = styled.div`
	grid-area: input;
	margin: 0 2em;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1.5fr;
	grid-template-areas:
		'name date'
		'weight grade'
	color: black;
	justify-content: center;
	align-items: center;
`;

const InputName = styled(TextInput)`
	grid-area: name;
`;

const InputDate = styled(TextInput)`
	grid-area: date;
`;

const InputWeight = styled(TextInput)`
	grid-area: weight;
`;

const InputGrade = styled(TextInput)`
	grid-area: grade;
`;

const Cancel = styled(CancelButton)`
	grid-area: left;
`;

const Submit = styled(MainButton)`
	grid-area: right;
`;

export interface AddItemInterface {
	handleSubmit: (data: AddItemData) => void;
	handleClose: () => void;
}

export interface AddItemData {
	name: string;
	date: string;
	weight: string;
	grade: string;
}

function AddItemModal({ handleSubmit, handleClose }: AddItemInterface) {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [weight, setWeight] = useState('');
	const [grade, setGrade] = useState('');

	function onSubmit({ name, date, weight, grade }: AddItemData) {
		handleSubmit({ name, date, weight, grade });
		handleClose();
	}

	return (
		<DefaultModal
			color="#4961E1"
			handleClose={handleClose}
			header="Add course item"
			footer={
				<ButtonField>
					<Cancel
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Cancel>
					<Submit
						onClick={() => onSubmit({ name, date, weight, grade })}
					>
						Add Item
					</Submit>
				</ButtonField>
			}
			primaryButton="Submit"
			secondaryButton="Cancel"
			handlePrimary={() => onSubmit({ name, date, weight, grade })}
		>
			<Body>
				<Desc>
					Add a new course item with any relevant information.
				</Desc>
				<BodyLogo>
					<Logo width="9em" height="9em" />
				</BodyLogo>
				<InputField>
					<InputName
						error={true}
						label="Name"
						value={name}
						placeholder="Name"
						onChange={(e) => {
							setName(e.currentTarget.value);
						}}
						required={true}
					></InputName>
					<InputDate
						label="Due Date"
						value={date}
						placeholder="Due date"
						onChange={(e) => {
							setDate(e.currentTarget.value);
						}}
					></InputDate>
					<InputWeight
						label="Weight"
						value={weight}
						placeholder="Weight"
						onChange={(e) => {
							setWeight(e.currentTarget.value);
						}}
					></InputWeight>
					<InputGrade
						label="Grade"
						value={grade}
						placeholder="Grade"
						onChange={(e) => {
							setGrade(e.currentTarget.value);
						}}
					></InputGrade>
				</InputField>
			</Body>
		</DefaultModal>
	);
}

export default AddItemModal;
