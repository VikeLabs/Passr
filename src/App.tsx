import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';
import MainActionButton from './components/MainActionButton';
import DropdownList from './components/DropdownList';
import ProfileDropdown from './molecules/ProfileDropdown';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import GenericDropdown from './components/GenericDropdown';

function App() {
	return (
		<div className="App">
			<Router>
				<GenericDropdown
					buttonDisplay={'test  '}
					dropdownItems={[
						{
							title: 'Profile',
							path: '/profile',
							cName: ' dropdown-link',
						},
						{
							title: 'Settings',
							path: '/settings',
							cName: ' dropdown-link',
						},
					]}
				/>
			</Router>
		</div>
	);
}

export default App;
