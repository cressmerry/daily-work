export default function NotesForm() {
  function save(event) {
    console.log(event);
  }
  function update(event) {
    console.log(event.target.value);
  }
  return (
    <>
      <h6>Add Note</h6>
      <input onChange={update} />
      <button onClick={save}>Save</button>
    </>
  );
}
