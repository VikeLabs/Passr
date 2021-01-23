import React, { useState } from 'react';
import Logo from 'molecules/Logo';
import MainButton from 'components/MainActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SignInPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.main[0]};
`;

const SignInContents = styled.div`
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

const SignInButton = styled(MainButton)`
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
	font-size: 1rem;
	font-weight: 500;
	margin: 0.5em;
	word-wrap: break-word;
`;

function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function SignInPage() {
	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false);
	const [userPass, setUserPass] = useState('');

	const history = useHistory();

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
		<SignInPageContainer>
			<SignInContents>
				<PassrLogo width="300px" height="300px" />
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
				<SignInButton disabled={emailErr} onClick={onSubmit}>
					Sign In
				</SignInButton>
				<TextLinkContainer>
					<TextLink
						text="Forgot your password?"
						onClick={() => history.push('/forgot')}
					/>
					<TextLink
						text="New user? Create a Passr account"
						onClick={() => history.push('/sign-up')}
					/>
				</TextLinkContainer>
			</SignInContents>
		</SignInPageContainer>
	);
}

export default SignInPage;
