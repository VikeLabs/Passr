import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

//Styling for entire login container
const LoginPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #e5e5e5;
	font-family: Montserrat, Arial, Helvetica, sans-serif;
	font-style: normal;
`;

//Styling for Passr logo placement
const PassrLogo = styled.div`
	position: absolute;
	height: 80.2px;
	left: 38.28%;
	right: 38.32%;
	top: 8.38%;
	bottom: 45.47%;
`;

//Styling for login button placement
const LoginButton = styled.div`
	position: absolute;
	left: 38.28%;
	right: 38.32%;
	top: 60.38%;
	bottom: 28.47%;
	height: 44px;
	width: 277px;
`;

//Styling for email input label
const InputLabelEmail = styled.div`
	position: absolute;
	height: 18px;
	left: 0px;
	right: 28px;
	top: calc(50% - 18px / 2);
	left: 38.28%;
	right: 38.32%;
	top: 32.38%;
	bottom: 35.47%;
	/* Subtitle 2 - medium 14 (18, 0.1px) */

	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	/* identical to box height, or 129% */

	letter-spacing: 0.1px;

	/* Primary */

	color: #4961e1;
`;

//Styling for password input label
const InputLabelPassword = styled.div`
	position: absolute;
	height: 18px;
	left: 0px;
	right: 40px;
	top: calc(50% - 18px / 2);
	left: 38.28%;
	right: 55.32%;
	top: 45.38%;
	bottom: 45.47%;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #4961e1;
`;

//Styling for email input box placement
const InputBoxEmail = styled.div`
	position: absolute;
	left: 38.28%;
	right: 38.32%;
	top: 35.38%;
	bottom: 58.47%;
`;

//Styling for password input box placement
const InputBoxPassword = styled.div`
	position: absolute;
	left: 38.28%;
	right: 38.32%;
	top: 48.38%;
	bottom: 45.47%;
`;

//Styling for links
const Links = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.1px;
`;

//Styling for new user link placement
const NewUserLink = styled.div`
	position: absolute;
	left: 38.28%;
	right: 38.32%;
	top: 79.38%;
	bottom: 45.47%;
`;

//Styling for password link placement
const PasswordLink = styled.div`
	position: absolute;
	left: 38.28%;
	right: 38.32%;
	top: 73.38%;
	bottom: 45.47%;
`;

function LoginPage() {
	return (
		<LoginPageContainer>
			<div>
				<PassrLogo>
					<img src={logo} alt="logo" />
				</PassrLogo>
				<form>
					<InputLabelEmail>
						<label>Email*</label>
					</InputLabelEmail>
					<InputLabelPassword>
						<label className="Password-label">Password*</label>
					</InputLabelPassword>
					<InputBoxEmail>
						<input type="text" />
					</InputBoxEmail>
					<InputBoxPassword>
						<input type="text" />
					</InputBoxPassword>
				</form>
				<LoginButton>
					<button type="button">Login</button>
				</LoginButton>
				<Links>
					<PasswordLink>
						<a
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Forgot your password?
						</a>
					</PasswordLink>
					<NewUserLink>
						<a
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							New user? Create a Passr account
						</a>
					</NewUserLink>
				</Links>
			</div>
		</LoginPageContainer>
	);
}

export default LoginPage;
