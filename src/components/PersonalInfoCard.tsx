import React, { useState } from 'react';
import styled from 'styled-components';
import ActionButton from 'components/ActionButton';
import TextInput from 'components/TextInput';
import { Title, Card } from './Card';

const PersonalInfoContainer = styled(Card)`
	grid-area: personal;
`;

const Content = styled.div`
	margin: 2.5em;
	display: grid;
	grid-template-columns: 15em 2fr 2fr;
	grid-template-rows: auto;
	grid-template-areas:
		'title title title'
		'avatar Col1 Col2';
`;

const PersonalInfoTitle = styled(Title)`
	margin-top: 0;
`;

const ProfilePicture = styled.div`
	font-size: 10em;
	padding-left: 0.2em;
	margin-right: 0.2em;
`;

const TextField = styled(TextInput)`
	padding-bottom: 2em;
`;
const UpdateButton = styled(ActionButton)`
	padding: 1em;
	width: 12em;
`;

const Subtitle = styled.h3``;

const ChangePasswordButton = styled(ActionButton)`
	padding: 1em;
	width: 12em;
	margin-top: 0.5em;
`;

const DeleteAccountButton = styled(ActionButton)`
	padding: 1em;
	width: 12em;
`;

function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function validName(name: string) {
	return !!name.match(/./);
}
function validPassword(password: string) {
	password;
	return true;
}

const Col = styled.div<{ gridArea: string }>`
	grid-area: ${(props) => props.gridArea};
	padding-right: 2em;
`;

function PersonalInfoCard() {
	// In the future not all of these (name, username, email will be mutable)
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false);
	const [nameErr, setNameErr] = useState(false);
	const [currPassword, setCurrPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [passwordErr, setPasswordErr] = useState(false);

	const handleSubmit = async () => {
		if (!validEmail(email)) {
			setEmailErr(true);
			return;
		}
		if (!validName(name)) {
			setNameErr(true);
			return;
		}
		if (!validPassword(newPassword)) {
			setPasswordErr(true);
			return;
		}
		console.log(`name: ${name} email: ${email}`);
	};

	return (
		<PersonalInfoContainer>
			<Content>
				<PersonalInfoTitle>Personal Info</PersonalInfoTitle>
				<ProfilePicture>
					<i className="fas fa-user-circle" />
				</ProfilePicture>

				<Col gridArea="Col1">
					<TextField
						value={name}
						onChange={(e) => {
							if (validName(e.target.value)) setNameErr(false);
							setName(e.target.value);
						}}
						onBlur={(e) => {
							if (!validName(e.target.value)) setNameErr(true);
						}}
						label="Nickname"
						required
						error={nameErr}
						placeholder="Nickname"
					/>
					<TextField
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
					<UpdateButton
						variant="primary"
						disabled={emailErr || nameErr}
						onClick={handleSubmit}
					>
						Update
					</UpdateButton>
				</Col>
				<Col gridArea="Col2">
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
					<DeleteAccountButton
						variant="negative"
						onClick={handleSubmit}
					>
						Delete Account
					</DeleteAccountButton>
				</Col>
			</Content>
		</PersonalInfoContainer>
	);
}
export default PersonalInfoCard;
