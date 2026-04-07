import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import AddCourse from "./components/AddCourse";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/add" element={<AddCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
