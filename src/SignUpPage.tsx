import React, { useState } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #e5e5e5;
`;

const LoginContents = styled.div`
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

const PassrLogo = styled.div`
	width: 100%;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	margin: 1.5em 0;
	width: 100%;
`;

const LoginButton = styled.button`
	width: 100%;
	margin: 1.5em 0;
`;

const InputLabel = styled.div`
	font-weight: 500;
	font-size: 1.2rem;
	color: #4961e1;
`;

const InputBox = styled.input`
	width: 100%;
`;

const Links = styled.div`
	font-size: 0.8rem;
	font-weight: 500;
	display: flex;
	flex-direction: column;
`;

function validEmail(email: string) {
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
		<LoginPageContainer>
			<LoginContents>
				<PassrLogo>
					<img src={logo} alt="logo" />
				</PassrLogo>

				<InputContainer>
					<InputLabel>
						<label>Email *</label>
					</InputLabel>
					<InputBox
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
				</InputContainer>

				<InputContainer>
					<InputLabel>
						<label>Confirm Email *</label>
					</InputLabel>
					<InputBox
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
				</InputContainer>

				<InputContainer>
					<InputLabel>
						<label className="Password-label">Password *</label>
					</InputLabel>
					<InputBox
						type="password"
						value={userPass}
						onChange={(e) => {
							if (validPass(e.target.value)) setPassErr(false);
							setUserPass(e.target.value);
						}}
					/>
				</InputContainer>

				<InputContainer>
					<InputLabel>
						<label className="Password-label">
							Confirm Password *
						</label>
					</InputLabel>
					<InputBox
						type="password"
						value={confirmUserPass}
						onChange={(e) => {
							if (comparePass(userPass, confirmUserPass))
								setPassErr(false);
							setConfirmUserPass(e.target.value);
						}}
					/>
				</InputContainer>

				<Links>
					<a
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Already Have an Account? Log in here.
					</a>
				</Links>
				<LoginButton
					type="button"
					disabled={emailErr || passErr}
					onClick={onSubmit}
				>
					Sign Up
				</LoginButton>
			</LoginContents>
		</LoginPageContainer>
	);
}
export default SignUpPage;
