import ActionButtons from "./ActionButtons";

function NoteTable({ notes, onDelete, onClose, requestSort, sortConfig }) {
  const formatDate = (isoString) => {
    if (!isoString) return { date: "—", time: "" };
    const d = new Date(isoString);
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th onClick={() => requestSort("title")} style={{ cursor: 'pointer' }}>
              Title {getSortIcon("title")}
            </th>
            <th onClick={() => requestSort("content")} style={{ cursor: 'pointer' }}>
              Content {getSortIcon("content")}
            </th>
            <th onClick={() => requestSort("status")} style={{ cursor: 'pointer' }}>
              Status {getSortIcon("status")}
            </th>
            <th onClick={() => requestSort("priority")} style={{ cursor: 'pointer' }}>
              Priority {getSortIcon("priority")}
            </th>
            <th onClick={() => requestSort("created_at")} style={{ cursor: 'pointer' }}>
              Created {getSortIcon("created_at")}
            </th>
            <th onClick={() => requestSort("completion_time")} style={{ cursor: 'pointer' }}>
              Target {getSortIcon("completion_time")}
            </th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => {
            const created = formatDate(note.created_at);
            const target = formatDate(note.completion_time);
            return (
              <tr key={note.id}>
                <td className="truncate" title={note.title}>{note.title}</td>
                <td className="truncate" title={note.content}>{note.content}</td>
                <td>
                  <span className={`status-badge ${(note.status || '').toLowerCase()}`}>
                    {note.status}
                  </span>
                </td>
                <td>{note.priority}</td>
                <td>
                  <div>{created.date}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{created.time}</div>
                </td>
                <td>
                  <div>{target.date}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{target.time}</div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <ActionButtons note={note} onDelete={onDelete} onClose={onClose}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default NoteTable;