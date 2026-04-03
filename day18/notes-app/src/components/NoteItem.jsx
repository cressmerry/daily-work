import { useState } from "react";
import api from "../api";

function NoteItem({ note, deleteNote, closeNote }) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!note) return null;

  const handleDelete = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const id = note.id;
      await api.delete(`/notes/${id}/`);
      deleteNote(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const id = note.id;
      await api.put(`/notes/${id}/`, {
        status: "closed",
      });
      closeNote(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <li>
      <div
        className={`note-content ${note.status === "closed" ? "closed-note" : ""}`}
      >
        <span className="note-title-text">{note.title}</span>
        <p className="note-body-text">{note.content}</p>
      </div>
      <div className="button-group">
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={isProcessing}
        >
          ✖
        </button>
        {note.status === "created" && (
          <button
            className="close-note-button"
            onClick={handleClose}
            disabled={isProcessing}
          >
            ✔
          </button>
        )}
      </div>
    </li>
  );
}

export default NoteItem;
