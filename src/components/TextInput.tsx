import React from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const Label = styled.p`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.primary[0]};
	margin: 0;
	margin-bottom: 0.5em;
`;

const Asterix = styled(Label)`
	color: ${({ theme }) => theme.colors.negative[0]};
	padding-left: 0.25em;
`;

const Input = styled.input<{ error: boolean }>`
	border: 1px solid ${({ theme }) => theme.colors.gray[2]};
	box-sizing: border-box;
	border-radius: 10px;
	box-sizing: border-box;
	outline: none;
	font-size: inherit;
	color: black;
	width: 100%;
	height: 100%;
	padding: 0.5em;
	&:focus {
		border: 1px solid ${({ theme }) => theme.colors.gray[3]};
	}
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray[2]};
	}
	${(props) =>
		props.error &&
		css`
			border: 2px solid ${props.theme.colors.error}; // Need to pick an error colour?
			&:focus {
				border: 2px solid ${props.theme.colors.error};
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
	...props
}: Props) {
	return (
		<InputContainer {...props}>
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
