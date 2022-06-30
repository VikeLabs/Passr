import React, { useState, useEffect, useReducer } from 'react';
import Logo from 'molecules/Logo';
import ActionButton from 'components/ActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const EMAIL_ERROR_MESSAGE = 'Invalid Email';
const VALIDATION_CODE_EMPTY_MESSAGE = 'Code cannot be empty';
const VALIDATION_CODE_MISMATCH_MESSAGE = 'Invalid verification code provided';
const PASS_EMPTY_MESSAGE = 'Password cannot be empty';
const PASS_ERROR_MESSAGE = 'Password does not meet requirements';
const CONFIRM_PASS_EMPTY_MESSAGE = 'Password cannot be empty';
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

function validPass(password: string) {
	if (
		!password.match(/.{8,}/) && // 8 Characters
		!password.match(/[A-Z]/) && // Upper-Case
		!password.match(/[a-z]/) // Lower-Case
	) {
		return true; // Passed all checks
	}

	return false; // Passed all checks
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

	const [codeAndPassStep, setCodeAndPassStep] = useState(false);

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

	const handleEmailStep = () => {
		if (validEmail(email.value)) {
			setEmail({ error: false });
			setCodeAndPassStep(true); // Send validation code
			Auth.forgotPassword(email.value)
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
		} else {
			setEmail({ error: true, errorMessage: EMAIL_ERROR_MESSAGE });
			return;
		}
	};

	const handleCodeAndPassStep = () => {
		if (!validationCode.value) {
			setValidationCode({
				error: true,
				errorMessage: VALIDATION_CODE_EMPTY_MESSAGE,
			});
		}
		if (!password.value) {
			setPassword({ error: true, errorMessage: PASS_EMPTY_MESSAGE });
		}
		if (!validPass(password.value) && password.value !== '') {
			setPassword({ error: true, errorMessage: PASS_ERROR_MESSAGE });
			return;
		}
		if (!confirmPass.value) {
			setConfirmPass({
				error: true,
				errorMessage: CONFIRM_PASS_EMPTY_MESSAGE,
			});
			return;
		}
		if (password.value !== confirmPass.value && confirmPass.value !== '') {
			setConfirmPass({
				error: true,
				errorMessage: CONFIRM_PASS_ERROR_MESSAGE,
			});
			return;
		}
		Auth.forgotPasswordSubmit(
			email.value,
			validationCode.value,
			password.value
		)
			.then((data) => console.log(data))
			.catch((err) => {
				if (err.code === 'CodeMismatchException') {
					setValidationCode({
						error: true,
						errorMessage: VALIDATION_CODE_MISMATCH_MESSAGE,
					});
				}
				console.log(err);
			});
	};

	const handleSubmit = async () => {
		if (!codeAndPassStep) {
			handleEmailStep();
		} else if (codeAndPassStep) {
			handleCodeAndPassStep();
		}
	};

	const refreshInputs = () => {
		setEmail(initialInputValue);
		setValidationCode(initialInputValue);
		setPassword(initialInputValue);
		setConfirmPass(initialInputValue);
		setCodeAndPassStep(false);
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
					disabled={codeAndPassStep}
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
				{codeAndPassStep && (
					<>
						<TextInput
							value={validationCode.value}
							required
							label="Validation Code"
							error={validationCode.error}
							placeholder="Validation Code"
							errorMessage={validationCode.errorMessage}
							onChange={(e) => {
								setValidationCode({ value: e.target.value });
								if (validationCode.value)
									setValidationCode({ error: false });
							}}
						/>
						<TextInput
							value={password.value}
							label="Set New Password"
							required
							type="password"
							placeholder="Password"
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
							placeholder="Confirm Password"
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
				{codeAndPassStep && (
					<TextLink text="Restart" onClick={refreshInputs} />
				)}
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
