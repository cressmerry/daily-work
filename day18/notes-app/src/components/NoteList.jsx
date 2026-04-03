import NoteItem from "./NoteItem";

function NoteList({ notes, deleteNote }) {
  return (
    <ul>
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          deleteNote={deleteNote} 
        />
      ))}
    </ul>
  );
}

export default NoteList;