import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddNote from "./AddNote";
import Homepage from "./Homepage";
import Notes from "./Notes";
import DeleteModal from "./components/DeleteModal";
import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const handleCloseNote = async (id) => {
    try {
      await api.put(`/notes/${id}/`, { status: "closed" });
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: "closed" } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await api.delete(`/notes/${noteToDelete}/`);
      setNotes((prev) => prev.filter((n) => n.id !== noteToDelete));
    } catch (err) {
      console.error(err);
    } finally {
      setNoteToDelete(null);
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content-area">
          <Routes>
            <Route
              index
              element={
                <div className="page-wrapper">
                  <Homepage notes={notes} />
                </div>
              }
            />
            <Route
              path="/add"
              element={
                <div className="page-wrapper">
                  <AddNote
                    notes={notes}
                    setNotes={setNotes}
                    onDelete={setNoteToDelete}
                    onClose={handleCloseNote}
                  />
                </div>
              }
            />
            <Route
              path="/notes"
              element={
                <div className="wide-page-wrapper">
                  <Notes
                    notes={notes}
                    onDelete={setNoteToDelete}
                    onClose={handleCloseNote}
                  />
                </div>
              }
            />
          </Routes>
        </main>
        {noteToDelete && (
          <DeleteModal
            onConfirmAction={confirmDelete}
            onCancelAction={() => setNoteToDelete(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
