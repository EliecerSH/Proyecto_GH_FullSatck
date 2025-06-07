import { MdDeleteForever } from 'react-icons/md';
import '../../styles/Notes.css';

const Note = ({ id, title, text, date, handleDeleteNote }) => (
    <div className="note">
        <div className="note-title">{title}</div>
        <span>{text}</span>
        <div className="note-footer">
            <small>{date}</small>
            <button onClick={() => handleDeleteNote(id)}>Delete</button>
        </div>
    </div>
);
export default Note;