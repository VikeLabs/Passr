import React, { useEffect, useReducer } from 'react';
import Logo from 'molecules/Logo';
import styled from 'styled-components';
import ActionButton from 'components/ActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const EMAIL_ERROR_MESSAGE = 'Invalid Email';
const CONFIRM_EMAIL_ERROR_MESSAGE = 'Email does not match';
const PASS_ERROR_MESSAGE = 'Password does not meet requirements';
const CONFIRM_PASS_ERROR_MESSAGE = 'Password does not match';

const SignUpPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.main[1]};
`;

const SignUpContents = styled.div`
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

const SignUpButton = styled(ActionButton)`
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

function validEmail(email: string) {
	console.log('Checking email');
	return !!email.match(/.+@.+\..{2,}/);
}

function validPass(password: string) {
	if (!password.match(/.{8,}/)) return false; // 8 Characters
	if (!password.match(/[A-Z]/)) return false; // Upper-Case
	if (!password.match(/[a-z]/)) return false; // Lower-Case
	return true; // Passed all checks
}

const initialInputValue: InputData = {
	value: '',
	error: false,
	errorMessage: '',
};

function SignUpPage() {
	const [email, emailDispatch] = useReducer(inputReducer, initialInputValue);
	const [confirmEmail, setConfirmEmail] = useReducer(
		inputReducer,
		initialInputValue
	);
	const [password, setPassword] = useReducer(inputReducer, initialInputValue);
	const [confirmPass, setConfirmPass] = useReducer(
		inputReducer,
		initialInputValue
	);

	const history = useHistory();

	const submittable = () => {
		if (!validPass(password.value)) return false;
		if (!validEmail(email.value)) return false;
		if (email.value !== confirmEmail.value) return false;
		if (password.value !== confirmPass.value) return false;
		return true;
	};

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				handleSubmit();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [email, password, confirmEmail, confirmPass]);

	const handleSubmit = async () => {
		if (!validEmail(email.value)) {
			email.errorMessage = EMAIL_ERROR_MESSAGE;
			emailDispatch({ error: true });
			return;
		}

		if (email.value !== confirmEmail.value) {
			confirmEmail.errorMessage = CONFIRM_EMAIL_ERROR_MESSAGE;
			setConfirmEmail({ error: true });
			return;
		}

		if (!validPass(password.value)) {
			password.errorMessage = PASS_ERROR_MESSAGE;
			setPassword({ error: true });
			return;
		}

		if (password.value !== confirmPass.value) {
			confirmPass.errorMessage = CONFIRM_PASS_ERROR_MESSAGE;
			setConfirmPass({ error: true });
			return;
		}

		try {
			const { user, userConfirmed } = await Auth.signUp({
				username: email.value,
				password: password.value,
			});
			console.log({ user });
			if (userConfirmed) {
				history.push('/');
			} else {
				history.push(
					`/confirm-sign-up?email=${encodeURI(email.value)}`
				);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<SignUpPageContainer>
			<SignUpContents>
				<PassrLogo width="300px" height="300px" />

				<TextInput
					label="Email"
					required
					placeholder={'example@example.com'}
					type="text"
					value={email.value}
					error={email.error}
					errorMessage={email.errorMessage}
					onChange={(e) => {
						if (
							validEmail(e.target.value) ||
							e.target.value === ''
						) {
							emailDispatch({
								error: false,
							});
						}
						emailDispatch({
							value: e.target.value,
						});
					}}
					onBlur={() => {
						if (!validEmail(email.value) && email.value !== '') {
							email.errorMessage = EMAIL_ERROR_MESSAGE;
							emailDispatch({ error: true });
						}
					}}
				/>
				<TextInput
					label="Confirm Email"
					required
					placeholder="example@example.com"
					type="text"
					value={confirmEmail.value}
					error={confirmEmail.error}
					errorMessage={confirmEmail.errorMessage}
					onChange={(e) => {
						if (email.value === e.target.value) {
							setConfirmEmail({
								error: false,
							});
						}
						setConfirmEmail({
							value: e.target.value,
						});
					}}
					onBlur={() => {
						if (email.value !== confirmEmail.value) {
							if (confirmEmail.value !== '') {
								confirmEmail.errorMessage = CONFIRM_EMAIL_ERROR_MESSAGE;
								setConfirmEmail({ error: true });
							} else {
								confirmEmail.errorMessage = '';
								setConfirmEmail({ error: false });
							}
						}
					}}
				/>
				<TextInput
					label="Password"
					required
					type="password"
					value={password.value}
					error={password.error}
					errorMessage={password.errorMessage}
					onChange={(e) => {
						if (
							validPass(e.target.value) ||
							e.target.value === ''
						) {
							setPassword({
								error: false,
							});
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
					label="Confirm Password"
					required
					type="password"
					value={confirmPass.value}
					error={confirmPass.error}
					errorMessage={confirmPass.errorMessage}
					onChange={(e) => {
						if (password.value === e.target.value) {
							setConfirmPass({
								error: false,
							});
						}
						setConfirmPass({
							value: e.target.value,
						});
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

				<SignUpButton
					disabled={!submittable()}
					variant="primary"
					onClick={handleSubmit}
				>
					Sign Up
				</SignUpButton>
				<TextLinkContainer>
					<TextLink
						text="Already have an account? Sign in here."
						onClick={() => {
							history.push('/sign-in');
						}}
					/>
				</TextLinkContainer>
			</SignUpContents>
		</SignUpPageContainer>
	);
}
export default SignUpPage;
