import Note from './Note';
import AddNote from './AddNote';
import '../../styles/Notes.css';

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
}) => {
	return (
		<div className='notes-list'>
			{[...notes].reverse().map((Note) => (
		<Note
			key={Note.id}
			id={Note.id}
			text={Note.text}
			date={Note.date}
			handleDeleteNote={handleDeleteNote}/>
	   ))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;
