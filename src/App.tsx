import React from 'react';
import Pages from './pages';
import MainButton from './components/MainActionButton';
import DeleteItemModal from 'components/DeleteItemModal';

function click() {
	console.log('clicked!');
}

function App() {
	// return <Pages />;
	// return (
	// 	<div>
	// 		<MainButton variant={'primary'} onClick={click}>
	// 			1
	// 		</MainButton>
	// 		<MainButton variant={'secondary'} onClick={click}>
	// 			2
	// 		</MainButton>
	// 		<MainButton variant={'alternate'} onClick={click}>
	// 			3
	// 		</MainButton>
	// 		<MainButton variant={'positive'} onClick={click}>
	// 			4
	// 		</MainButton>
	// 		<MainButton variant={'negative'} onClick={click}>
	// 			5
	// 		</MainButton>
	// 	</div>
	// );
	return (
		<DeleteItemModal
			handleClose={() => console.log('c')}
			handleDelete={() => console.log('d')}
		></DeleteItemModal>
	);
}

export default App;
