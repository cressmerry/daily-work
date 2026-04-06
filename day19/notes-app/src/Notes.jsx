import emptyIllustration from "./assets/empty-list-placeholder.png";
import NoteTable from "./components/NoteTable";

function Notes({ notes }) {
  return (
    <>
      {notes.length == 0 ? (
        <img
          class="empty-illustration"
          src={emptyIllustration}
          alt="Empty List Image"
        />
      ) : (
        <NoteTable notes={notes} />
      )}
    </>
  );
}

export default Notes;
