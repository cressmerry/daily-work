import { useState } from "react";

function NoteForm({ addNote }) {
  const [note, setNote] = useState({ title: "", status: "open" });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note.title.trim()) return;
    addNote({
      title: note.title.trim(),
      status: note.status,
    });
    setNote({ title: "", status: "open" });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: type === "checkbox" ? (checked ? "closed" : "open") : value,
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

      <label>
        Status
        <input
          name="status"
          type="checkbox"
          checked={note.status === "closed"}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

export default NoteForm;
