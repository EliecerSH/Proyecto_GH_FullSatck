import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import '../../styles/Notes.css';

const AppNotes = () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        try {
            const savedNotes = JSON.parse(localStorage.getItem('notes-data'));
            if (savedNotes) setNotes(savedNotes);
        } catch (e) {
			console.error('error para cargar notas de localStorage:', e);
           
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('notes-data', JSON.stringify(notes));
        } catch (e) {
            
        }
    }, [notes]);

  	const addNote = (title, text) => {
    	const newNote = {
        id: Date.now(),
        title,
        text,
        date: new Date().toLocaleDateString(),
     };
    	setNotes([...notes, newNote]);
	};

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchText.toLowerCase()) ||
            note.text.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='notes-container'>
            <Header />
            <NotesList
                notes={filteredNotes}
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
            />
        </div>
    );
};

export default AppNotes;