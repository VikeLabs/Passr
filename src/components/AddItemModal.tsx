import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import DefaultModal from './DefaultModal';
import Logo from '../molecules/Logo';
import TextInput from './TextInput';

const Body = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-rows: 1fr 4fr 5fr;
	grid-template-areas:
		'desc'
		'logo'
		'inputs';
	justify-items: center;
`;

const Desc = styled.p`
	grid-area: desc;
	font-size: 0.8rem;
	margin: 1em 0 0 0.2em;
`;

const BodyLogo = styled(Logo)`
	grid-area: logo;
`;

const InputField = styled.div`
	grid-area: inputs;
	padding: 0 0 0.5em 0;
	margin: 0 2.2em 0 2em;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
		'name date'
		'weight grade';
	grid-column-gap: 2em;
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

	const theme = useContext(ThemeContext);

	function onSubmit({ name, date, weight, grade }: AddItemData) {
		handleSubmit({ name, date, weight, grade });
		handleClose();
	}

	return (
		<DefaultModal
			headerColor={theme.colors.primary[0]}
			handleClose={handleClose}
			header="Add course item"
			primaryButton="Submit"
			primaryVariant="primary"
			secondaryButton="Cancel"
			secondaryVariant="alternate"
			handlePrimary={() => onSubmit({ name, date, weight, grade })}
		>
			<Body>
				<Desc>
					Add a new course item with any relevant information.
				</Desc>
				<BodyLogo width="13em" height="100%" />
				<InputField>
					<InputName
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
