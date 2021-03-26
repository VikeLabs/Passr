import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import DefaultModal from './DefaultModal';
import Logo from '../molecules/Logo';
import TextInput from './TextInput';
import { Course } from '../api';

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
	font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const InputField = styled.div`
	margin: 0 2.2em 0 2em;
	display: block;
`;

const InputName = styled(TextInput)`
	padding-top: 0.75em;
`;
const InputCourseNumber = styled(TextInput)`
	padding-top: 0.75em;
`;
const InputDesiredGrade = styled(TextInput)`
	padding-top: 0.75em;
	padding-bottom: 1em;
`;

export interface AddCourseInterface {
	handleSubmit: (data: AddCourseData) => void;
	handleClose: () => void;
}

export type AddCourseData = Pick<Course, 'name' | 'crn' | 'desiredGrade'>;

function AddCourseModal({ handleSubmit, handleClose }: AddCourseInterface) {
	const [name, setName] = useState('');
	const [crn, setCNumber] = useState('');
	const [desiredGrade, setGrade] = useState('');

	const theme = useContext(ThemeContext);

	function onSubmit() {
		const crnNo = isNaN(Number(crn)) ? undefined : Number(crn);
		const gradeNo = isNaN(Number(desiredGrade))
			? undefined
			: Number(desiredGrade);
		handleSubmit({ name, crn: crnNo, desiredGrade: gradeNo });
		handleClose();
	}

	return (
		<DefaultModal
			headerColor={theme.colors.primary[0]}
			handleClose={handleClose}
			header="Add Course"
			primaryButton="Submit"
			primaryVariant="primary"
			secondaryButton="Cancel"
			secondaryVariant="alternate"
			handlePrimary={onSubmit}
		>
			<Body>
				<Desc>Add a New Course.</Desc>
				<Logo width="13em" height="100%" />
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
					<InputCourseNumber
						label="Course Number"
						value={crn}
						placeholder="Course Number"
						onChange={(e) => {
							setCNumber(e.currentTarget.value);
						}}
					></InputCourseNumber>
					<InputDesiredGrade
						label="Desired Grade"
						value={desiredGrade}
						placeholder="Desired Grade"
						onChange={(e) => {
							setGrade(e.currentTarget.value);
						}}
					></InputDesiredGrade>
				</InputField>
			</Body>
		</DefaultModal>
	);
}

export default AddCourseModal;
