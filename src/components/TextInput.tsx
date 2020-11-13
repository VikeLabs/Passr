import React from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const Label = styled.p`
	font-size: 0.75em;
	margin: 0;
	color: #4961e1;
	margin-bottom: 0.5em;
`;

const Asterix = styled(Label)`
	color: #bf080a;
	padding-left: 0.25em;
`;

const Input = styled.input<{ error: boolean }>`
	border-radius: 4px;
	font-size: 0.8em;
	border: none;
	width: 100%;
	padding: 0.25em;
	${(props) =>
		props.error &&
		css`
			border: 1px solid red; // Need to pick an error colour?
		`}
`;

interface Props {
	error?: boolean;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	required?: boolean;
	type?: string;
}

function TextInput({ error, value, onChange, label, required, type }: Props) {
	return (
		<InputContainer>
			{label && (
				<LabelContainer>
					<Label>{label}</Label>
					{required && <Asterix>*</Asterix>}
				</LabelContainer>
			)}
			<Input
				error={!!error}
				type={type || 'text'}
				value={value}
				onChange={onChange}
			/>
		</InputContainer>
	);
}

export default TextInput;
