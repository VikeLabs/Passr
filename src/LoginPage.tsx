import React from 'react';
import logo from './logo.svg';
import './LoginPage.css';

function LoginPage() {
	return (
		<div className="Login-page-container">
			<img src={logo} className="Passr-logo" alt="logo" />
			<form>
				<label className="Email-label">Email*</label>
				<input type="text" id="Email" className="Email"/>
				<label className="Password-label">Password*</label>
  			<input type="text" className="Password"/>
			</form>
			<button type="button" className="Login-button">Login</button>
      <a
        className="Password-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Forgot your password?
      </a>
			<a
        className="New-user-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        New user? Create a Passr account
      </a>
		</div>
	);
}

export default LoginPage;
