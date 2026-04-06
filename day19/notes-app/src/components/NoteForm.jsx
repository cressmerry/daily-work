import { useState } from "react";
import api from "../api";

function NoteForm({ addNote }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    completionTime: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    visible: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!note.title.trim() || !note.content.trim() || !note.completionTime) {
      setErrorMessage({
        message: "Title, Content, and Completion Time are required",
        visible: true,
      });
      return;
    }

    const date = new Date(note.completionTime);
    if (isNaN(date.getTime()) || date < new Date()) {
       setErrorMessage({
        message: "Invalid Completion Time",
        visible: true,
      });
      return;
    }

    try {
      setErrorMessage({ message: "", visible: false });

      const isoCompletionTime = new Date(note.completionTime).toISOString();

      const response = await api.post("/notes", {
        title: note.title.trim(),
        content: note.content.trim(),
        completion_time: isoCompletionTime,
      });

      addNote({ ...response.data, status: "created" });
      setNote({ title: "", content: "", completionTime: "" });
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
        <div className="note-row">
          <input
            className="note-title-input"
            name="title"
            placeholder="Enter Title..."
            value={note.title}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            className="note-completion-time-input"
            name="completionTime"
            value={note.completionTime}
            onChange={handleChange}
          />
        </div>
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
