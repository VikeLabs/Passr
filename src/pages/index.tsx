import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GradeBook from '../GradeBook';
import { SignIn, SignUp } from './accounts';
import ConfirmSignUp from './accounts/ConfirmSignUp';
import ErrorPage from '../ErrorPage';

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
				<Route exact path={'/'}>
					<GradeBook />
				</Route>
				<Router>
					<ErrorPage />
				</Router>
			</Switch>
		</Router>
	);
}

export default Pages;
