import ActionButtons from "./ActionButtons";

function NoteItem({ note, onDelete, onClose }) {
  if (!note) return null;

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <li>
      <div
        className={`note-content ${note.status === "closed" ? "closed-note" : ""}`}
      >
        <div className="note-header">
          <span className="note-title-text" title={note.title}>
            {note.title}
          </span>
          <span className="note-date-text">
            {formatDate(note.completion_time)}
          </span>
          <span className="note-priority-text">Priority: {note.priority}</span>
        </div>
        <p className="note-body-text" title={note.content}>
          {note.content}
        </p>
      </div>
      <ActionButtons note={note} onDelete={onDelete} onClose={onClose} />
    </li>
  );
}

export default NoteItem;
