import { useState } from "react";
import axios from "axios";

function NoteForm({ addNote }) {
  const [note, setNote] = useState({ title: "", status: "open" });
  const [errorMessage, setErrorMssage] = useState({
    message: "",
    visible: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note.title.trim()) {
      setErrorMssage({ message: "Invalid Title", visible: true });
      return;
    }
    setErrorMssage({ message: "", visible: false });
    sendPostRequest(note);
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

  function sendPostRequest(note){
    axios.post();
  }

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <div className="notes-input">
        <input
          className="note-title-input"
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
      </div>
      <button className="add-button" type="submit">
        Add
      </button>
      {errorMessage.visible && (<div className="error-message"> {errorMessage.message}</div>)}
    </form>
  );
}

export default NoteForm;
