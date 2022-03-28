import React, { useState, useEffect, useReducer } from 'react';
import Logo from 'molecules/Logo';
import ActionButton from 'components/ActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const EMAIL_ERROR_MESSAGE = 'Invalid Email';
const VALIDATION_CODE_ERROR_MESSAGE = 'Invalid Code';
const PASS_ERROR_MESSAGE = 'Password does not meet requirements';
const CONFIRM_PASS_ERROR_MESSAGE = 'Password does not match';

const ForgotPasswordPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.main[1]};
`;

const ForgotPasswordContents = styled.div`
	max-width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	grid-gap: 1em;
`;

const PassrLogo = styled(Logo)`
	width: 100%;
`;

const SubmitButton = styled(ActionButton)`
	width: 100%;
	padding: 1em;
`;

const TextLinkContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
`;

const TextLink = styled(TextButton)`
	font-size: ${({ theme }) => theme.fontSizes.s};
	font-weight: 500;
	margin: 0.5em;
	word-wrap: break-word;
`;

interface InputData {
	value: string;
	error: boolean;
	errorMessage: string;
}

function inputReducer(state: InputData, action: Partial<InputData>) {
	return { ...state, ...action };
}

const initialInputValue: InputData = {
	value: '',
	error: false,
	errorMessage: '',
};

function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function validCode(code: string) {
	// TODO: Change hard code values when validation code is implemented
	if (code !== 'code') return false;
	return true;
}

function validPass(password: string) {
	if (!password.match(/.{8,}/)) return false; // 8 Characters
	if (!password.match(/[A-Z]/)) return false; // Upper-Case
	if (!password.match(/[a-z]/)) return false; // Lower-Case
	return true; // Passed all checks
}

function ForgotPasswordPage() {
	const [email, setEmail] = useReducer(inputReducer, initialInputValue);
	const [validationCode, setValidationCode] = useReducer(
		inputReducer,
		initialInputValue
	);
	const [password, setPassword] = useReducer(inputReducer, initialInputValue);
	const [confirmPass, setConfirmPass] = useReducer(
		inputReducer,
		initialInputValue
	);
	const [codeStep, setCodeStep] = useState(false);
	const [passStep, setPassStep] = useState(false);

	const history = useHistory();

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				console.log('User not signed in.');
			});
	}, []);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				console.log('Enter pressed!');
				handleSubmit();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [email]);

	const handleSubmit = async () => {
		// EMAIL
		if (!validEmail(email.value)) {
			email.errorMessage = EMAIL_ERROR_MESSAGE;
			setEmail({ error: true });
			return;
		} else {
			setEmail({ error: false });
			setCodeStep(true); // Send validation code
		}

		if (codeStep && !validCode(validationCode.value)) {
			validationCode.errorMessage = VALIDATION_CODE_ERROR_MESSAGE;
			setValidationCode({ error: true });
			return;
		} else {
			setValidationCode({ error: false });
			// setPassStep(true);
		}

		if (passStep && !validPass(password.value)) {
			password.errorMessage = PASS_ERROR_MESSAGE;
			setPassword({ error: true });
			return;
		}

		if (passStep && password.value !== confirmPass.value) {
			confirmPass.errorMessage = CONFIRM_PASS_ERROR_MESSAGE;
			setConfirmPass({ error: true });
			return;
		}
	};

	return (
		<ForgotPasswordPageContainer>
			<ForgotPasswordContents>
				<PassrLogo width="300px" height="300px" />
				<TextInput
					value={email.value}
					label="Email"
					required
					error={email.error}
					errorMessage={email.errorMessage}
					placeholder="example@example.com"
					onChange={(e) => {
						if (
							validEmail(e.target.value) ||
							e.target.value === ''
						) {
							setEmail({ error: false });
						}
						setEmail({
							value: e.target.value,
						});
					}}
					onBlur={() => {
						if (!validEmail(email.value) && email.value !== '') {
							email.errorMessage = EMAIL_ERROR_MESSAGE;
							setEmail({ error: true });
						}
					}}
				/>
				{codeStep && (
					<TextInput
						value={validationCode.value}
						required
						label="Validation Code"
						error={validationCode.error}
						placeholder="Validation Code"
						errorMessage={validationCode.errorMessage}
						onChange={(e) => {
							// if (
							// 	validCode(e.target.value) ||
							// 	e.target.value === ''
							// ) {
							// 	setValidationCode({ error: false });
							// }
							setValidationCode({ value: e.target.value });
						}}
					/>
				)}
				{passStep && (
					<>
						<TextInput
							value={password.value}
							label="Set New Password"
							required
							type="password"
							error={password.error}
							errorMessage={password.errorMessage}
							onChange={(e) => {
								if (
									validPass(e.target.value) ||
									e.target.value === ''
								) {
									setPassword({ error: false });
								}
								setPassword({ value: e.target.value });
							}}
							onBlur={() => {
								if (
									!validPass(password.value) &&
									password.value !== ''
								) {
									password.errorMessage = PASS_ERROR_MESSAGE;
									setPassword({ error: true });
								}
							}}
						/>
						<TextInput
							value={confirmPass.value}
							label="Confirm New Password"
							required
							type="password"
							error={confirmPass.error}
							errorMessage={confirmPass.errorMessage}
							onChange={(e) => {
								if (password.value === e.target.value) {
									setConfirmPass({ error: false });
								}
								setConfirmPass({ value: e.target.value });
							}}
							onBlur={() => {
								if (password.value !== confirmPass.value) {
									if (confirmPass.value !== '') {
										confirmPass.errorMessage = CONFIRM_PASS_ERROR_MESSAGE;
										setConfirmPass({ error: true });
									} else {
										confirmPass.errorMessage = '';
										setConfirmPass({ error: false });
									}
								}
							}}
						/>
					</>
				)}
				<SubmitButton variant="primary" onClick={handleSubmit}>
					Submit
				</SubmitButton>
				<TextLinkContainer>
					<TextLink
						text="Already have an account? Sign in"
						onClick={() => history.push('/sign-in')}
					/>
					<TextLink
						text="New user? Create a Passr account"
						onClick={() => history.push('/sign-up')}
					/>
				</TextLinkContainer>
			</ForgotPasswordContents>
		</ForgotPasswordPageContainer>
	);
}

export default ForgotPasswordPage;
