import ActionButtons from "./ActionButtons";

function NoteTable({ notes, onDelete, onClose }) {
  const formatDate = (isoString) => {
    if (!isoString) return { date: "N/A", time: "" };
    const d = new Date(isoString);
    return {
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      }),
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Notes Overview</h2>
        <span className="count-badge">{notes.length} Total</span>
      </div>
      <div className="table-wrapper">
        <table className="custom-table" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "35px" }}>#</th>
              <th style={{ width: "15%" }}>Title</th>
              <th>Content</th>
              <th style={{ width: "80px" }}>Status</th>
              <th style={{ width: "60px" }}>Pri.</th>
              <th style={{ width: "95px" }}>Target</th>
              <th style={{ width: "95px" }}>Created</th>
              <th style={{ width: "85px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              const target = formatDate(note.completion_time);
              const created = formatDate(note.created_at);
              return (
                <tr key={note.id || index}>
                  <td>{index + 1}</td>
                  <td className="bold-text truncate" title={note.title}>
                    {note.title}
                  </td>
                  <td className="truncate" title={note.content}>
                    {note.content}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${note.status?.toLowerCase()}`}
                    >
                      {note.status}
                    </span>
                  </td>
                  <td>{note.priority}</td>
                  <td className="date-cell">
                    <div className="date-main">{target.date}</div>
                    <div className="date-sub">{target.time}</div>
                  </td>
                  <td className="date-cell">
                    <div className="date-main">{created.date}</div>
                    <div className="date-sub">{created.time}</div>
                  </td>
                  <td>
                    <ActionButtons
                      note={note}
                      onDelete={onDelete}
                      onClose={onClose}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoteTable;
