import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultModal from './DefaultModal';
import Logo from '../molecules/Logo';
import TextInput from './TextInput';
import CancelButton from './CancelButton';
import MainButton from './MainActionButton';

const Body = styled.div`
	height: 20em;
`;

const Desc = styled.p`
	margin-left: 0;
	align-self: left;
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
	// > * {
	// 	width: 10em;
	// }
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

const ButtonField = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas: 'cancel submit';
	grid-gap: 1em;
	// align-items: center;
`;

const Cancel = styled(CancelButton)`
	grid-area: cancel;
	// width: 20px;
`;

const Submit = styled(MainButton)`
	grid-area: submit;
`;

const Overlay = styled.div`
	position: absolute;
	backdrop-filter: blur(5px);
	height: 100%;
	width: 100%;
	display: flex;
	// justify-content: center;
	align-items: center;

	&.closed {
		display: none;
	}
`;

export interface AddItemInterface {
	onSubmit: (data: AddItemData) => void;
}

export interface AddItemData {
	name: string;
	date: string;
	weight: string;
	grade: string;
}

function AddItemModal({ onSubmit }: AddItemInterface) {
	const [isOpen, setStatus] = useState('');
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [weight, setWeight] = useState('');
	const [grade, setGrade] = useState('');

	function close() {
		setStatus('closed');
	}

	function handleSubmit({ name, date, weight, grade }: AddItemData) {
		onSubmit({ name, date, weight, grade });
		close();
	}

	return (
		<Overlay onClick={close} className={isOpen}>
			<DefaultModal
				color="#4961E1"
				header="Add course item"
				footer={
					<ButtonField>
						<Cancel
							onClick={() => {
								close();
							}}
						>
							Cancel
						</Cancel>
						<Submit
							onClick={() =>
								handleSubmit({ name, date, weight, grade })
							}
						>
							Add Item
						</Submit>
					</ButtonField>
				}
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
		</Overlay>
	);
}

export default AddItemModal;
