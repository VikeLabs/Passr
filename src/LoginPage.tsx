import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

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

const PassrLogo = styled.div`
	position: absolute;
	height: 80.2px;
	left: 38.28%;
	right: 38.32%;
	top: 8.38%;
	bottom: 45.47%;
`;

const LoginButton = styled.div`
	position: absolute;
	left: 38.28%;
	right: 38.32%;
	top: 60.38%;
	bottom: 28.47%;
	height: 44px;
	width: 277px;
`;

const InputLabelEmail = styled.div`
	height: 18px;
	left: 0px;
	right: 28px;
	top: calc(50% - 18px / 2);
	left: 38.28%;
	right: 38.32%;
	top: 32.38%;
	bottom: 35.47%;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.1px;
	color: #4961e1;
`;

const InputLabelPassword = styled.div`
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

const InputBoxEmail = styled.div`
	left: 38.28%;
	right: 38.32%;
	top: 35.38%;
	bottom: 58.47%;
`;

const InputBoxPassword = styled.div`
	left: 38.28%;
	right: 38.32%;
	top: 48.38%;
	bottom: 45.47%;
`;

const Links = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.1px;
`;

const NewUserLink = styled.div`
	left: 38.28%;
	right: 38.32%;
	top: 79.38%;
	bottom: 45.47%;
`;

const PasswordLink = styled.div`
	left: 38.28%;
	right: 38.32%;
	top: 73.38%;
	bottom: 45.47%;
`;

function LoginPage() {
	return (
		<LoginPageContainer>
			<PassrLogo>
				<img src={logo} alt="logo" />
			</PassrLogo>
			<InputLabelEmail>
				<label>Email*</label>
			</InputLabelEmail>
			<InputBoxEmail>
				<input type="text" />
			</InputBoxEmail>
			<InputLabelPassword>
				<label className="Password-label">Password*</label>
			</InputLabelPassword>
			<InputBoxPassword>
				<input type="text" />
			</InputBoxPassword>
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
		</LoginPageContainer>
	);
}

export default LoginPage;
