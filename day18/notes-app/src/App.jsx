import { useState, useEffect } from "react";
import api from "./api";
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const addNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="notes-app-card">
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

export default App;