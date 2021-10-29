import React, { useState } from 'react';
import styled from 'styled-components';
import ActionButton from 'components/ActionButton';
import TextInput from 'components/TextInput';
import { Title, Card } from './Card';

const PrivacyCardContainer = styled(Card)`
	grid-area: privacy;
`;

const Content = styled.div`
	margin: 2.5em;
`;

const Subtitle = styled.h3``;

const TextField = styled(TextInput)``;

const CurrentPassword = styled.div`
	padding-top: 0.5em;
	padding-bottom: 0.5em;
`;

const NewPassword = styled.div`
	padding-top: 0.5em;
	padding-bottom: 0.5em;
`;

const ReEnterPassword = styled.div`
	padding-top: 0.5em;
	padding-bottom: 0.5em;
`;

const ChangePasswordButton = styled(ActionButton)`
	padding: 1em;
	width: 200px;
	margin-top: 0.5em;
`;

const DeleteAccountButton = styled(ActionButton)`
	padding: 1em;
	width: 200px;
`;

function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function PrivacyCard() {
	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false);

	const handleSubmit = async () => {
		if (!validEmail(email)) {
			setEmailErr(true);
			return;
		}
		console.log(email);
	};

	return (
		<PrivacyCardContainer>
			<Content>
				<Title>Privacy</Title>
				<Subtitle>Change Password</Subtitle>
				<CurrentPassword>
					<TextField
						value={email}
						onChange={(e) => {
							if (validEmail(e.target.value)) setEmailErr(false);
							setEmail(e.target.value);
						}}
						onBlur={(e) => {
							if (!validEmail(e.target.value)) setEmailErr(true);
						}}
						label="Current Password"
						required
						error={emailErr}
						placeholder="Current Password"
					/>
				</CurrentPassword>
				<NewPassword>
					<TextField
						value={email}
						onChange={(e) => {
							if (validEmail(e.target.value)) setEmailErr(false);
							setEmail(e.target.value);
						}}
						onBlur={(e) => {
							if (!validEmail(e.target.value)) setEmailErr(true);
						}}
						label="New Password"
						required
						error={emailErr}
						placeholder="New Password"
					/>
				</NewPassword>
				<ReEnterPassword>
					<TextField
						value={email}
						onChange={(e) => {
							if (validEmail(e.target.value)) setEmailErr(false);
							setEmail(e.target.value);
						}}
						onBlur={(e) => {
							if (!validEmail(e.target.value)) setEmailErr(true);
						}}
						label="Re-enter New Password"
						required
						error={emailErr}
						placeholder="New Password"
					/>
				</ReEnterPassword>
				<ChangePasswordButton
					variant="primary"
					disabled={emailErr}
					onClick={handleSubmit}
				>
					Change Password
				</ChangePasswordButton>

				<Subtitle style={{ marginTop: '3em' }}>
					{' '}
					Delete Account
				</Subtitle>
				<DeleteAccountButton
					variant="negative"
					disabled={emailErr}
					onClick={handleSubmit}
				>
					Delete Account
				</DeleteAccountButton>
			</Content>
		</PrivacyCardContainer>
	);
}

export default PrivacyCard;
