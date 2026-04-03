import NoteItem from "./NoteItem";

function NoteList({ notes, deleteNote, closeNote }) {
  return (
    <ul>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          closeNote={closeNote}
        />
      ))}
    </ul>
  );
}

export default NoteList;
