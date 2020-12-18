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
	border: none;
	border: 1px solid #bdbdbd;
	border-radius: 10px;
	outline: none;
	// outline: auto 1px #bdbdbd;
	font-size: 0.8em;
	color: black;
	width: 10em;
	height: 2em;
	padding: 0.25em;
	&:focus {
		border: 1px solid #aaaaaa;
	}
	&::placeholder {
		color: #bdbdbd;
	}
	${(props) =>
		props.error &&
		css`
			border: 2px solid #ff8888; // Need to pick an error colour?
			&:focus {
				border: 2px solid red;
			}
		`}
`;

interface Props {
	error?: boolean;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	label?: string;
	required?: boolean;
	type?: 'text' | 'password';
	placeholder?: string;
}

/**
 *
 * @param error Display error markers (default: false)
 * @param value Text input value
 * @param onChange On text input change
 * @param onBlur On text input blur (optional)
 * @param label Label for text input (optional)
 * @param required Add required asterix to label (default: false)
 * @param type Input type (text/password) (default: text)
 * @param placeholder Input placeholder
 */
function TextInput({
	error = false,
	value,
	onChange,
	onBlur,
	label,
	required = false,
	type = 'text',
	placeholder = '',
}: Props) {
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
				type={type}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
			/>
		</InputContainer>
	);
}

export default TextInput;
