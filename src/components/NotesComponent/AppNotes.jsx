import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import Header from './Header';
import Search from './Search'; 
import '../../styles/Notes.css';

import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import app from '../../firebase'; 

const db = getFirestore(app);
const notesCollection = collection(db, "notas");

const AppNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Cargar notas en tiempo real desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData);
    });

    return () => unsubscribe(); // Limpiar al desmontar
  }, []);

  // Agregar nueva nota a Firestore
  const addNote = async (title, text) => {
    if (!title.trim() && !text.trim()) return; // Evita agregar notas vacías

    const newNote = {
      title,
      text,
      date: new Date().toLocaleDateString()
    };

    try {
      await addDoc(notesCollection, newNote);
    } catch (error) {
      console.error("Error agregando nota:", error);
    }
  };

  // Eliminar una nota de Firestore
  const deleteNote = async (id) => {
    try {
      const noteRef = doc(db, "notas", id);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error("Error eliminando nota:", error);
    }
  };

  // Filtro de búsqueda (corregido para evitar errores)
  const filteredNotes = notes.filter((note) => {
    const title = (note.title || '').toLowerCase();
    const text = (note.text || '').toLowerCase();
    const search = searchText.toLowerCase();

    return title.includes(search) || text.includes(search);
  });

  return (
    <div className="notes-container">
      <Header />
      <Search handleSearchNote={setSearchText} />
      <NotesList
        notes={filteredNotes}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
  );
};

export default AppNotes;
