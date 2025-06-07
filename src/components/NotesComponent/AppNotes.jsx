import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import AddNote from './AddNote';
import '../../styles/Notes.css';

const AppNotes = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2025',
		},
	]);

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const AddNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((Note) => Note.id !== id);
		setNotes(newNotes);
	};

	return (

			<div className='container-note'>
			<Header />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((Note) =>
						Note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={AddNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
	);
};

export default AppNotes;
