import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onClose }) {
  return (
    <ul>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onClose={onClose}
        />
      ))}
    </ul>
  );
}

export default NoteList;