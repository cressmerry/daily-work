import { useState } from "react";

function NoteForm({ addNote }) {
  const [note, setNote] = useState({ title: "", status: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note.title.trim()) return;
    if (!note.status.trim()) return;
    addNote({
      title: note.title.trim(),
      status: note.status.trim(),
    });
    setNote({ title: "", status: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Enter note..."
        value={note.title}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Enter status..."
        value={note.status}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default NoteForm;
