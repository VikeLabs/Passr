import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';
import MainActionButton from './components/MainActionButton';
import Dropdown from './components/Dropdown';
import ProfileDropdown from './components/ProfileDropdown';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

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
