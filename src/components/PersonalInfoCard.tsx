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
	grid-template-columns: 15em 2fr 2fr 2fr;
	grid-template-rows: auto;
	grid-template-areas:
		'title title title title'
		'avatar Col1 Col2 .';
`;

const PersonalInfoTitle = styled(Title)`
	margin-top: 0;
`;

const ProfilePicture = styled.div`
	font-size: 10em;
	padding-left: 0.2em;
	margin-right: 0.2em;
`;
const Col1 = styled.div`
	grid-area: Col1;
	padding-right: 2em;
`;
const Col2 = styled.div`
	grid-area: Col2;
	padding-right: 2em;
`;
const TextField = styled(TextInput)`
	padding-bottom: 2em;
`;
const UpdateButton = styled(ActionButton)`
	padding: 1em;
`;

function validEmail(email: string) {
	return !!email.match(/.+@.+\..{2,}/);
}

function validName(name: string) {
	return !!name.match(/./);
}

function validUsername(username: string) {
	return !!username.match(/./);
}

function PersonalInfoCard() {
	// In the future not all of these (name, username, email will be mutable)
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false);
	const [nameErr, setNameErr] = useState(false);
	const [usernameErr, setUsernameErr] = useState(false);

	const handleSubmit = async () => {
		if (!validEmail(email)) {
			setEmailErr(true);
			return;
		}
		if (!validName(name)) {
			setNameErr(true);
			return;
		}
		if (!validUsername(username)) {
			setUsernameErr(true);
			return;
		}
		console.log(`name: ${name} email: ${email} username: ${username}`);
	};

	return (
		<PersonalInfoContainer>
			<Content>
				<PersonalInfoTitle>Personal Info</PersonalInfoTitle>
				<ProfilePicture>
					<i className="fas fa-user-circle" />
				</ProfilePicture>

				<Col1>
					<TextField
						value={name}
						onChange={(e) => {
							if (validName(e.target.value)) setNameErr(false);
							setName(e.target.value);
						}}
						onBlur={(e) => {
							if (!validName(e.target.value)) setNameErr(true);
						}}
						label="Name"
						required
						error={nameErr}
						placeholder="Name"
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
						disabled={emailErr || nameErr || usernameErr}
						onClick={handleSubmit}
					>
						Update
					</UpdateButton>
				</Col1>
				<Col2>
					<TextField
						value={username}
						onChange={(e) => {
							if (validUsername(e.target.value))
								setUsernameErr(false);
							setUsername(e.target.value);
						}}
						onBlur={(e) => {
							if (!validUsername(e.target.value))
								setUsernameErr(true);
						}}
						label="Username"
						required
						error={usernameErr}
						placeholder="Username"
					/>
				</Col2>
			</Content>
		</PersonalInfoContainer>
	);
}
export default PersonalInfoCard;
