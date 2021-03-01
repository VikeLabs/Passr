import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GradeBook from '../GradeBook';
import { SignIn, SignUp } from './accounts';
import ConfirmSignUp from './accounts/ConfirmSignUp';
import ForgotPassword from './accounts/ForgotPassword';

function Pages() {
	return (
		<Router>
			<Switch>
				<Route path={`/sign-in`}>
					<SignIn />
				</Route>
				<Route path="/sign-up">
					<SignUp />
				</Route>
				<Route path="/confirm-sign-up">
					<ConfirmSignUp />
				</Route>
				<Route path="/forgot">
					<ForgotPassword />
				</Route>
				<Route path="/">
					<GradeBook />
				</Route>
			</Switch>
		</Router>
	);
}

export default Pages;
