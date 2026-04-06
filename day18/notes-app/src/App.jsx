import { useState, useEffect } from "react";
import api from "./api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);

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

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await api.delete(`/notes/${noteToDelete}/`);
      setNotes((prev) => prev.filter((note) => note.id !== noteToDelete));
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setNoteToDelete(null);
    }
  };

  const closeNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, status: "closed" } : note
      )
    );
  };

  return (
    <div className="notes-app-card">
      <NoteForm addNote={addNote} />
      <NoteList 
        notes={notes} 
        deleteNote={setNoteToDelete} 
        closeNote={closeNote} 
      />
      {noteToDelete && (
        <DeleteModal 
          onConfirmAction={confirmDelete} 
          onCancelAction={() => setNoteToDelete(null)} 
        />
      )}
    </div>
  );
}

export default App;