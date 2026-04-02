function NoteItem({ note, deleteNote }) {
  const handleDeleteClick = () => {
    deleteNote(note.id);
  };
  return (
    <li>
      <span>{note.title} Status:{note.status}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default NoteItem;
   