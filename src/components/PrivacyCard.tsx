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

const PasswordContainer = styled.div`
	padding-top: 0.5em;
	padding-bottom: 0.5em;
`;
const ChangePasswordButton = styled(ActionButton)`
	padding: 1em;
	width: 12em;
	margin-top: 0.5em;
`;

const DeleteAccountButton = styled(ActionButton)`
	padding: 1em;
	width: 12em;
`;

// to be implemented
function validPassword() {
	return true;
}

function PrivacyCard() {
	const [currPassword, setCurrPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [passwordErr, setPasswordErr] = useState(false);

	const handleSubmit = async () => {
		// to be implemented
		// check currPassword is the actual current password
		// check newPassword is valid password
		// check rePassword = newPassword
		if (!validPassword(newPassword)) {
			setPasswordErr(true);
			return;
		}
	};

	return (
		<PrivacyCardContainer>
			<Content>
				<Title>Privacy</Title>
				<Subtitle>Change Password</Subtitle>
				<PasswordContainer>
					<TextField
						type="password"
						value={currPassword}
						onChange={(e) => {
							if (validPassword(e.target.value))
								setPasswordErr(false);
							setCurrPassword(e.target.value);
						}}
						onBlur={(e) => {
							if (!validPassword(e.target.value))
								setPasswordErr(true);
						}}
						label="Current Password"
						required
						error={passwordErr}
						placeholder="Current Password"
					/>
				</PasswordContainer>
				<PasswordContainer>
					<TextField
						type="password"
						value={newPassword}
						onChange={(e) => {
							if (validPassword(e.target.value))
								setPasswordErr(false);
							setNewPassword(e.target.value);
						}}
						onBlur={(e) => {
							if (!validPassword(e.target.value))
								setPasswordErr(true);
						}}
						label="New Password"
						required
						error={passwordErr}
						placeholder="New Password"
					/>
				</PasswordContainer>
				<PasswordContainer>
					<TextField
						type="password"
						value={rePassword}
						onChange={(e) => {
							if (validPassword(e.target.value))
								setPasswordErr(false);
							setRePassword(e.target.value);
						}}
						onBlur={(e) => {
							if (!validPassword(e.target.value))
								setPasswordErr(true);
						}}
						label="Re-enter New Password"
						required
						error={passwordErr}
						placeholder="New Password"
					/>
				</PasswordContainer>
				<ChangePasswordButton
					variant="primary"
					disabled={passwordErr}
					onClick={handleSubmit}
				>
					Change Password
				</ChangePasswordButton>

				<Subtitle style={{ marginTop: '3em' }}>
					{' '}
					Delete Account
				</Subtitle>
				<DeleteAccountButton variant="negative" onClick={handleSubmit}>
					Delete Account
				</DeleteAccountButton>
			</Content>
		</PrivacyCardContainer>
	);
}

export default PrivacyCard;
