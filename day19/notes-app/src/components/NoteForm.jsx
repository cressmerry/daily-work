import { useState } from "react";
import api from "../api";

function NoteForm({ addNote }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    completionTime: "",
    priority: 15,
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
        priority: note.priority,
      });

      addNote({ ...response.data, status: "created" });
      setNote({ title: "", content: "", completionTime: "", priority: 15 });
    } catch (error) {
      setErrorMessage({ message: "Failed to save note.", visible: true });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title" && value.length > 30) return;
    if (name === "content" && value.length > 100) return;

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
            aria-label="Completion Time"
            className="note-completion-time-input"
            name="completionTime"
            value={note.completionTime}
            onChange={handleChange}
          />
        </div>
        <div className="textarea-container">
          <textarea
            className="note-content-input"
            name="content"
            placeholder="Enter Content..."
            value={note.content}
            onChange={handleChange}
          />
          <div className="char-counter">{note.content.length} / 200</div>
        </div>
        <div className="priority-container">
          <div className="priority-header">
            <label htmlFor="priority">Priority: {note.priority}</label>
          </div>
          <input
            type="range"
            id="priority"
            name="priority"
            min="0"
            max="30"
            className="priority-slider"
            value={note.priority}
            onChange={handleChange}
          />
        </div>
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
