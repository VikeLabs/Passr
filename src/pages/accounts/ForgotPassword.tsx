import React, { useState, useEffect } from 'react';
import Logo from 'molecules/Logo';
import ActionButton from 'components/ActionButton';
import TextButton from 'components/TextButton';
import TextInput from 'components/TextInput';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

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

function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function SignInPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState(false);
	const [userPassError, setUserPassError] = useState(false);

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
	}, [email, password]);

	const handleSubmit = async () => {
		if (!validEmail(email)) {
			setEmailErr(true);
			return;
		}
		console.log(email);
	};

	return (
		<ForgotPasswordPageContainer>
			<ForgotPasswordContents>
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
					label="Email"
					required
					error={emailErr}
					placeholder="Email"
				/>
				<SubmitButton
					variant="primary"
					disabled={emailErr}
					onClick={handleSubmit}
				>
					Submit
				</SubmitButton>
				{userPassError && <h1>Could not sign in.</h1>}
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

export default SignInPage;
