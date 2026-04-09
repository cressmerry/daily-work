import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import QuestionForm from "./components/QuestionForm";
import Homepage from "./Homepage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="content-area">
          <Routes>
            <Route
              path="/"
              element={
                <div className="page-wrapper">
                  <Homepage />
                </div>
              }
            />
            <Route
              path="/demo"
              element={
                <div className="page-wrapper">
                  <QuestionForm />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;