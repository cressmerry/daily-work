import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddNote from "./AddNote";
import Homepage from "./Homepage";
import Notes from "./Notes";
import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [notes, setNotes] = useState([]);

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


  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content-area">
          <div className="page-wrapper">
            <Routes>
              <Route index element={<Homepage notes="notes" />} />
              <Route
                path="/add"
                element={
                  <AddNote
                    notes={notes}
                    setNotes={setNotes}
                  />
                }
              />
              <Route
                path="/notes"
                element={
                  <Notes
                    notes={notes}
                  />
                }
              />
              <Route path="*" element={<Homepage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
