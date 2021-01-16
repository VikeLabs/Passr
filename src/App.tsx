import React from 'react';
import './App.css';
import AddItemModal, { AddItemData } from './components/AddItemModal';
import Logo from './molecules/Logo';

function handleInfo({ name, date, weight, grade }: AddItemData) {
	console.log(name);
	console.log(date);
	console.log(weight);
	console.log(grade);
}

function handleClose() {
	console.log('add item modal closed');
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<Logo width="300px" height="300px" />
				<AddItemModal
					handleSubmit={handleInfo}
					handleClose={handleClose}
				></AddItemModal>
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
