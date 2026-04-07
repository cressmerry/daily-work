import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import DeleteModal from "./components/DeleteModal";
import { useState } from "react";
import api from "./api";

function AddNote({ notes, setNotes }) {
  const [noteToDelete, setNoteToDelete] = useState(null);
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
        note.id === id ? { ...note, status: "closed" } : note,
      ),
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

export default AddNote;
