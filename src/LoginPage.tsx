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

function LoginPage() {
	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false);
	const [userPass, setUserPass] = useState('');

	const onSubmit = () => {
		console.log('Signing in.');
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
						<label className="Password-label">Password *</label>
					</InputLabel>
					<InputBox
						type="password"
						value={userPass}
						onChange={(e) => {
							setUserPass(e.target.value);
						}}
					/>
				</InputContainer>
				<Links>
					<a
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Forgot your password?
					</a>
					<a
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						New user? Create a Passr account
					</a>
				</Links>
				<LoginButton
					type="button"
					disabled={emailErr}
					onClick={onSubmit}
				>
					Login
				</LoginButton>
			</LoginContents>
		</LoginPageContainer>
	);
}

export default LoginPage;
