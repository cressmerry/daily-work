import api from "../api";

function NoteItem({ note, deleteNote }) {
  const handleDelete = async () => {
    try {
      const id = note.id;
      await api.delete(`/notes/${id}`);
      deleteNote(id); 
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <li>
      <div className="note-content">
        <span className="note-title-text">{note.title}</span>
        <p className="note-body-text">{note.content}</p>
      </div>
      <button className="delete-button" onClick={handleDelete}>✖</button>
    </li>
  );
}

export default NoteItem;