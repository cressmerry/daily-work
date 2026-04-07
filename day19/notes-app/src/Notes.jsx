import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteTable from "./components/NoteTable";
import emptyIllustration from "./assets/empty-list-placeholder.png";

function Notes({ notes, onDelete, onClose }) {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 300);
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(value.toLowerCase()) ||
      note.content.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className="wide-page-wrapper">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes by title or content..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {filteredNotes.length > 0 ? (
        <NoteTable
          notes={filteredNotes}
          onDelete={onDelete}
          onClose={onClose}
        />
      ) : (
        <div className="empty-state">
          <img
            className="empty-illustration"
            src={emptyIllustration}
            alt="Empty List Image"
          />
        </div>
      )}
    </div>
  );
}

export default Notes;
