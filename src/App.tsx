import React from 'react';
import './App.css';
import ProfileDropdown from './molecules/ProfileDropdown';
import { BrowserRouter as Router } from 'react-router-dom';

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
