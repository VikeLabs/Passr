import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Accounts from './accounts';

function Pages() {
	return (
		<Router>
			<Switch>
				<Route path="/accounts">
					<Accounts />
				</Route>
			</Switch>
		</Router>
	);
}

export default Pages;
