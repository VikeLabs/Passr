import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from './LoginPage';

function Accounts() {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<Route path={`${path}/sign-in`}>
				<Login />
			</Route>
			<Route path="/">
				<div
					style={{
						backgroundColor: 'pink',
						height: '100vh',
						width: '100vw',
					}}
				></div>
			</Route>
		</Switch>
	);
}

export default Accounts;
