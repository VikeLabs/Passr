import React, { useState } from 'react';
import Logo from 'molecules/Logo';
import styled from 'styled-components';
import MainButton from 'components/MainActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import { useHistory } from 'react-router-dom';

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

function validEmail(email: string) {
	console.log('Checking email');
	return !!email.match(/.+@.+\..{2,}/);
}

function compareEmail(email1: string, email2: string) {
	return !!email1.match(email2);
}

function validPass(password: string) {
	if (!password.match(/.{8,}/)) return false; // 8 Characters
	if (!password.match(/[A-Z]/)) return false; // Upper-Case
	if (!password.match(/[a-z]/)) return false; // Lower-Case
	return true; // Passed all checks
}

function comparePass(password1: string, password2: string) {
	return !!password1.match(password2);
}

function SignUpPage() {
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false);
	const [userPass, setUserPass] = useState('');
	const [confirmUserPass, setConfirmUserPass] = useState('');
	const [passErr, setPassErr] = useState(false);

	const history = useHistory();

	const onSubmit = () => {
		console.log('Creating Account.');
		console.log(`Username: ${email}`);
		console.log(`Password: ${userPass.replaceAll(/.{1}/g, '*')}`);
		if (!validEmail(email)) {
			setEmailErr(true);
			return;
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
					value={email}
					onChange={(e) => {
						if (validEmail(e.target.value)) setEmailErr(false);
						setEmail(e.target.value);
					}}
					onBlur={(e) => {
						if (!validEmail(e.target.value)) setEmailErr(true);
					}}
				/>
				<TextInput
					label="Confirm Email"
					required
					placeholder="example@example.com"
					type="text"
					value={confirmEmail}
					onChange={(e) => {
						if (compareEmail(email, confirmEmail))
							setEmailErr(false);
						setConfirmEmail(e.target.value);
					}}
					onBlur={() => {
						if (!compareEmail(email, confirmEmail))
							setEmailErr(true);
					}}
				/>
				<TextInput
					label="Password"
					required
					type="password"
					value={userPass}
					onChange={(e) => {
						if (validPass(e.target.value)) setPassErr(false);
						setUserPass(e.target.value);
					}}
				/>

				<TextInput
					label="Confirm Password"
					required
					type="password"
					value={confirmUserPass}
					onChange={(e) => {
						if (comparePass(userPass, confirmUserPass))
							setPassErr(false);
						setConfirmUserPass(e.target.value);
					}}
				/>

				<SignUpButton disabled={emailErr || passErr} onClick={onSubmit}>
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
