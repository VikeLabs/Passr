import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import DefaultModal from './DefaultModal';
import TextInput from './TextInput';
import Logo from '../molecules/Logo';

const Body = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-rows: 1fr 4fr 2fr;
	grid-template-areas:
		'desc'
		'logo'
		'input';
	justify-items: center;
`;
const Desc = styled.p`
	grid-area: desc;
	font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const BodyLogo = styled(Logo)`
	grid-area: logo;
`;

const InputField = styled.div`
	grid-area: input;
	justify-content: center;
	align-items: center;
`;

export interface AddSemesterInterface {
	handleSubmit: (data: AddSemesterData) => void;
	handleClose: () => void;
}

export interface AddSemesterData {
	name: string;
}

function AddSemesterModal({ handleSubmit, handleClose }: AddSemesterInterface) {
	const [name, setName] = useState('');

	const theme = useContext(ThemeContext);

	function onSubmit({ name }: AddSemesterData) {
		handleSubmit({ name });
		handleClose();
	}

	return (
		<DefaultModal
			headerColor={theme.colors.primary[0]}
			handleClose={handleClose}
			header="Add Semester"
			primaryButton="Submit"
			primaryVariant="primary"
			secondaryButton="Cancel"
			secondaryVariant="alternate"
			handlePrimary={() => onSubmit({ name })}
		>
			<Body>
				<Desc>Enter a name for the new semester.</Desc>
				<BodyLogo width="13em" height="100%" />
				<InputField>
					<TextInput
						label="Name"
						value={name}
						onChange={(e) => {
							setName(e.currentTarget.value);
						}}
						required={true}
					></TextInput>
				</InputField>
			</Body>
		</DefaultModal>
	);
}

export default AddSemesterModal;
