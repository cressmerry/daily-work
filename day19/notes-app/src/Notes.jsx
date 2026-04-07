import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import NoteTable from "./components/NoteTable";
import Chart from "./components/Chart";
import "./Notes.css";

function Notes({ notes, onDelete, onClose }) {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 300);
  const [sortConfig, setSortConfig] = useState({ key: "created_at", direction: "desc" });

  const sortedNotes = useMemo(() => {
    const uniqueNotesMap = new Map();
    notes.forEach(note => {
      if (note.id) uniqueNotesMap.set(note.id, note);
    });
    const uniqueNotes = Array.from(uniqueNotesMap.values());

    const searchLower = value.toLowerCase();
    const filtered = uniqueNotes.filter(
      (note) =>
        (note.title?.toLowerCase() || "").includes(searchLower) ||
        (note.content?.toLowerCase() || "").includes(searchLower)
    );

    return [...filtered].sort((a, b) => {
      let v1 = a[sortConfig.key] ?? "";
      let v2 = b[sortConfig.key] ?? "";

      if (typeof v1 === "string" && typeof v2 === "string") {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
      }

      if (v1 < v2) return sortConfig.direction === "asc" ? -1 : 1;
      if (v1 > v2) return sortConfig.direction === "asc" ? 1 : -1;
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
      <div className="notes-dashboard">
        <header className="dashboard-header">
          <div className="header-text">
            <h2>Notes Dashboard</h2>
          </div>
          <div className="count-badge">{sortedNotes.length} Total</div>
        </header>

        <input
          type="text"
          className="search-input"
          placeholder="Type to search notes..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <main className="main-content">
          <NoteTable
            notes={sortedNotes}
            onDelete={onDelete}
            onClose={onClose}
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
        </main>

        <section className="analytics-section">
          <div className="analytics-card">
            <h3>Note Analytics</h3>
            <div className="chart-container">
              <Chart notes={notes} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Notes;