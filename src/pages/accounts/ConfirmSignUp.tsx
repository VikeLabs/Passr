import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

import TextInput from 'components/TextInput';
import Logo from 'molecules/Logo';
import MainButton from 'components/MainActionButton';
import { useLocation, useHistory } from 'react-router-dom';
import TextButton from 'components/TextButton';

const ConfirmSignUpContents = styled.div`
	max-width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	grid-gap: 1em;
`;
const ConfirmSignUpContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #e5e5e5;
`;

const ConfirmButton = styled(MainButton)`
	padding: 1em;
	width: 100%;
`;
const ResendButton = styled(TextButton)`
	color: #666666;
`;

function ConfirmSignUp() {
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const queryParams = new URLSearchParams(useLocation().search);
	const history = useHistory();
	useEffect(() => {
		const emailParam = queryParams.get('email');
		const codeParam = queryParams.get('code');
		if (emailParam) {
			setEmail(decodeURI(emailParam));
		}
		if (codeParam) {
			setCode(codeParam);
		}
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
	}, [email, code]);

	const handleSubmit = async () => {
		try {
			await Auth.confirmSignUp(email, code);
			console.log('Confirmed.');
			history.push('/sign-in');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<ConfirmSignUpContainer>
			<ConfirmSignUpContents>
				<Logo height="300px" width="300px" />
				<TextInput
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label={'Email'}
					placeholder={'Email'}
				/>
				<TextInput
					value={code}
					onChange={(e) => setCode(e.target.value)}
					label="Confirmation Code"
					placeholder="Code"
				/>
				<ConfirmButton variant="primary" onClick={handleSubmit}>
					Confirm Account
				</ConfirmButton>
				<ResendButton
					text={"Didn't receive a code? Resend it now"}
					onClick={() => Auth.resendSignUp(email)}
				/>
			</ConfirmSignUpContents>
		</ConfirmSignUpContainer>
	);
}

export default ConfirmSignUp;
