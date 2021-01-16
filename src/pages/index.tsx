import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GradeBook from '../GradeBook';
import { SignIn, SignUp } from './accounts';

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
				<Route path="/">
					<GradeBook />
				</Route>
			</Switch>
		</Router>
	);
}

export default Pages;
