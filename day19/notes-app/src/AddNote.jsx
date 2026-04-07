import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function AddNote({ notes, setNotes, onDelete, onClose }) {
  const addNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <div className="notes-app-card">
      <NoteForm addNote={addNote} />
      <NoteList
        notes={notes}
        onDelete={onDelete}
        onClose={onClose}
      />
    </div>
  );
}

export default AddNote;