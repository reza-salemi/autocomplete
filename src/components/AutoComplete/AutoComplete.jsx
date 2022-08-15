import { useState, useEffect, useRef } from 'react';
import styles from './AutoComplete.module.scss';

const AutoComplete = ({ items = [] }) => {
	const [searchField, setSearchField] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);

	const filteredSuggestions = items.filter((item) =>
		item.title.toLowerCase().includes(searchField.toLowerCase())
	);

	const autocompleteRef = useRef();

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	};

	const handleSuggestionClick = (suggestion) => {
		setSearchField(suggestion);
		setShowSuggestions(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				autocompleteRef.current &&
				!autocompleteRef.current.contains(event.target)
			) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	}, []);

	return (
		<div className={styles.autocomplete} ref={autocompleteRef}>
			<input
				type='text'
				placeholder='search items'
				value={searchField}
				onChange={onSearchChange}
				onFocus={() => setShowSuggestions(true)}
			/>

			<div>
				{showSuggestions && (
					<ul className={`${styles.suggestions} ${styles.active}`}>
						{filteredSuggestions.map((item, index) => (
							<li onClick={() => handleSuggestionClick(item.title)} key={index}>
								{item.title}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default AutoComplete;
