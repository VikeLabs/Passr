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
				<ProfileDropdown />
			</Router>
		</div>
	);
}

export default App;
