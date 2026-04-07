import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import NoteTable from "./components/NoteTable";
import emptyIllustration from "./assets/empty-list-placeholder.png";

function Notes({ notes, onDelete, onClose }) {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 300);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  const sortedNotes = useMemo(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(value.toLowerCase()) ||
        note.content.toLowerCase().includes(value.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const value1 = a[sortConfig.key] ?? "";
      const value2 = b[sortConfig.key] ?? "";

      if (value1 < value2) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (value1 > value2) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [notes, value, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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

      {sortedNotes.length > 0 ? (
        <NoteTable
          notes={sortedNotes}
          onDelete={onDelete}
          onClose={onClose}
          requestSort={requestSort}
          sortConfig={sortConfig}
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
