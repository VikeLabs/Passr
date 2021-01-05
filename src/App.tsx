import React from 'react';
import './App.css';
import Logo from './molecules/Logo';
import DeleteButton from './components/DeleteButton';
import MainButton from './components/MainActionButton';
import AddItemModal, { AddItemData } from './components/AddItemModal';
import DeleteItemModal from './components/DeleteItemModal';

function del() {
	console.log('assignment deleted');
}

function add({ name, date, weight, grade }: AddItemData) {
	console.log(name);
	console.log(date);
	console.log(weight);
	console.log(grade);
}

function close() {
	console.log('modal closed');
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<Logo width="300px" height="300px" />
				<DeleteItemModal
					handleDelete={() => del()}
					handleClose={() => close()}
				></DeleteItemModal>
				{/* <AddItemModal
					handleSubmit={(data) => add(data)}
					handleClose={() => close()}
				></AddItemModal> */}
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<MainButton variant="success" onClick={() => del()}>
					Delete
				</MainButton>
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
