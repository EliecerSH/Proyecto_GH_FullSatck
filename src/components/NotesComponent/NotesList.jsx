import Note from './Note';
import AddNote from './AddNote';
import '../../styles/Notes.css';

const NotesList = ({
    notes,
    handleAddNote,
    handleDeleteNote,
}) => {
    const notesCount = notes.length;
    const notesClass = `notes-list-notes${notesCount > 1 ? ' multiple' : ''}`;

    return (
        <div className="notes-list-vertical">
            <div className="note-creator-wrapper">
                <AddNote handleAddNote={handleAddNote} />
            </div>
            <div className={notesClass}>
                {[...notes].reverse().map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        text={note.text}
                        date={note.date}
                        handleDeleteNote={handleDeleteNote}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesList;