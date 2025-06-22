import { useState } from 'react';
import '../../styles/Notes.css';

const AddNote = ({ handleAddNote }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    const handleSaveClick = () => {
        if (noteTitle.trim().length > 0 && noteText.trim().length > 0) {
            handleAddNote(noteTitle, noteText);
            setNoteTitle('');
            setNoteText('');
        }
    };

    return (
        <div className="note new">
            <input
                className="note-title-input"
                type="text"
                placeholder="Title"
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
            />
            <textarea
                rows="3"
                placeholder="Type to add a note..."
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
            />
            <button 
                onClick={handleSaveClick}
                disabled={noteTitle.trim().length === 0 || noteText.trim().length === 0}
                className="save"
                > Save </button>
        </div>
    );
};

export default AddNote;