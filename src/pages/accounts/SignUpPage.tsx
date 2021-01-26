import React, { useState, useEffect } from 'react';
import Logo from 'molecules/Logo';
import styled from 'styled-components';
import MainButton from 'components/MainActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const SignUpPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.main[0]};
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

const SignUpButton = styled(MainButton)`
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

interface FieldValidation {
	value: string;
	error: boolean;
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

function SignUpPage() {
	const [email, setEmail] = useState<FieldValidation>({
		value: '',
		error: false,
	});
	const [confirmEmail, setConfirmEmail] = useState<FieldValidation>({
		value: '',
		error: false,
	});
	const [password, setPassword] = useState<FieldValidation>({
		value: '',
		error: false,
	});
	const [confirmPass, setConfirmPass] = useState<FieldValidation>({
		value: '',
		error: false,
	});

	const history = useHistory();

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
			setEmail({ ...email, error: true });
			return;
		}

		if (email.value !== confirmEmail.value) {
			setConfirmEmail({ ...confirmEmail, error: true });
			return;
		}

		if (!validPass(password.value)) {
			setPassword({ ...password, error: true });
			return;
		}

		if (password.value !== confirmPass.value) {
			setConfirmPass({ ...confirmPass, error: true });
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
					onChange={(e) => {
						if (validEmail(e.target.value)) {
							console.log('Valid email...');
							setEmail({ value: e.target.value, error: false });
						} else {
							setEmail({ ...email, value: e.target.value });
						}
					}}
					onBlur={(e) => {
						if (!validEmail(e.target.value)) {
							setEmail({ ...email, error: true });
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
					onChange={(e) => {
						if (email.value === e.target.value) {
							setConfirmEmail({
								value: e.target.value,
								error: false,
							});
						} else {
							setConfirmEmail({
								...confirmEmail,
								value: e.target.value,
							});
						}
					}}
					onBlur={() => {
						if (email.value !== confirmEmail.value) {
							setConfirmEmail({ ...confirmEmail, error: true });
						}
					}}
				/>
				<TextInput
					label="Password"
					required
					type="password"
					value={password.value}
					error={password.error}
					onChange={(e) => {
						if (validPass(e.target.value)) {
							setPassword({
								value: e.target.value,
								error: false,
							});
						} else {
							setPassword({ ...password, value: e.target.value });
						}
					}}
					onBlur={() => {
						if (!validPass(password.value)) {
							setPassword({ ...password, error: true });
						}
					}}
				/>

				<TextInput
					label="Confirm Password"
					required
					type="password"
					value={confirmPass.value}
					error={confirmPass.error}
					onChange={(e) => {
						if (password.value === e.target.value) {
							setConfirmPass({
								value: e.target.value,
								error: false,
							});
						} else {
							setConfirmPass({
								...confirmPass,
								value: e.target.value,
							});
						}
					}}
					onBlur={() => {
						if (password.value !== confirmPass.value) {
							setConfirmPass({ ...confirmPass, error: true });
						}
					}}
				/>

				<SignUpButton
					disabled={
						email.error ||
						password.error ||
						confirmPass.error ||
						confirmEmail.error
					}
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
