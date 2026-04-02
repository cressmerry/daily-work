function NoteItem({ note, deleteNote }) {
  const handleDeleteClick = () => {
    deleteNote(note.id);
  };
  return (
    <li>
      {note.title}
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default NoteItem;
   