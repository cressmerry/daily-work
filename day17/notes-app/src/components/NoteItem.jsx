function NoteItem({ note, deleteNote }) {
  const handleDeleteClick = () => {
    deleteNote(note.id);
  };
  return (
    <li className="note-content">
      <span className="note-title-text">
        {note.title}{" "}
        <sup
          title="Task Status"
          className={`task-indicator ${note.status}-task-indicator`}
        >
          {note.status}
        </sup>
      </span>
      <button className="delete-button" onClick={handleDeleteClick}>
        ✖
      </button>
    </li>
  );
}

export default NoteItem;
