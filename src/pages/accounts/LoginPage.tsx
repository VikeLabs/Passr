import React, { useState } from 'react';
import Logo from 'molecules/Logo';
import LoginButton from 'components/MainActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
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

const PassrLogo = styled(Logo)`
	width: 100%;
`;

const InputContainer = styled.div`
	justify-content: center;
	margin: 0 0 1.5em;
	width: 100%;
`;

const LoginButtonContainer = styled(LoginButton)`
	width: 100%;
	margin: 0 0 1.5em;
`;

const Links = styled(TextButton)`
	font-size: 0.8rem;
	font-weight: 500;
	display: flex;
	flex-direction: column;
`;

const LinksWrapper = styled.div`
	justify-content: flex-start;
`;
function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function tempOnClick() {
	console.log('A click!');
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
				<PassrLogo width="300px" height="300px" />
				<InputContainer>
					<TextInput
						value={email}
						onChange={(e) => {
							if (validEmail(e.target.value)) setEmailErr(false);
							setEmail(e.target.value);
						}}
						onBlur={(e) => {
							if (!validEmail(e.target.value)) setEmailErr(true);
						}}
						label="Username"
						required
						error={emailErr}
						placeholder="Username"
					/>
				</InputContainer>
				<InputContainer>
					<TextInput
						value={userPass}
						onChange={(e) => {
							setUserPass(e.target.value);
						}}
						label="Password"
						required={true}
						type="password"
						placeholder="Password"
					/>
				</InputContainer>
				<LoginButtonContainer onClick={onSubmit}>
					<p>Login</p>
				</LoginButtonContainer>
				<LinksWrapper>
					<Links text="Forgot your password?" onClick={tempOnClick} />
					<Links
						text="New user? Create a Passr account"
						onClick={tempOnClick}
					/>
				</LinksWrapper>
			</LoginContents>
		</LoginPageContainer>
	);
}

export default LoginPage;
