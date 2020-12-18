import React from 'react';
import './App.css';
import Logo from './molecules/Logo';
import AddItemModal from './components/AddItemModal';

interface inter {
	name: string;
	date: string;
	weight: string;
	grade: string;
}

function showinfo({ name, date, weight, grade }: inter) {
	alert(name);
	alert(date);
	alert(weight);
	alert(grade);
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<Logo width="300px" height="300px" />
				<AddItemModal onSubmit={() => alert('helo')} />
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
