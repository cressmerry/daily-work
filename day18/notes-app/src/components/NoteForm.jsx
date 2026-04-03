import { useState } from "react";
import api from "../api";

function NoteForm({ addNote }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    visible: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      setErrorMessage({
        message: "Title and Content are required",
        visible: true,
      });
      return;
    }

    try {
      setErrorMessage({ message: "", visible: false });
      const response = await api.post("/notes", {
        title: note.title.trim(),
        content: note.content.trim(),
      });

      addNote({ ...response.data, status: "created" });
      setNote({ title: "", content: "" });
    } catch (error) {
      setErrorMessage({ message: "Failed to save note.", visible: true });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <div className="notes-input">
        <input
          className="note-title-input"
          name="title"
          placeholder="Enter Title..."
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          className="note-content-input"
          name="content"
          placeholder="Enter Content..."
          value={note.content}
          onChange={handleChange}
        />
      </div>
      <button className="add-button" type="submit">
        Add Note
      </button>
      {errorMessage.visible && (
        <div className="error-message">{errorMessage.message}</div>
      )}
    </form>
  );
}

export default NoteForm;
