function NoteTable({ notes }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Completion Target</th>
            <th>Creation Time</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note.id || index}>
              <td>{index + 1}</td>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>
                <span className="status-badge">{note.status}</span>
              </td>
              <td>{formatDate(note.completion_time)}</td>
              <td>{formatDate(note.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NoteTable;
