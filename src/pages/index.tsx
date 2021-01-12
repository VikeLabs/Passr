import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GradeBook from '../GradeBook';
import { Login, SignUp } from './accounts';

function Pages() {
	return (
		<Router>
			<Switch>
				<Route path={`/sign-in`}>
					<Login />
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
