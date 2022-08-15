import { useEffect, useState } from 'react';
import './App.css';
import AutoComplete from './assets/components/AutoComplete/AutoComplete';

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch('https://dummyjson.com/products')
			.then((response) => response.json())
			.then((items) => setItems(items.products));
	}, []);

	return (
		<div className='App'>
			<AutoComplete items={items} />
		</div>
	);
}

export default App;
