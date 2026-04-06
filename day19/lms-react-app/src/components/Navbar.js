import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Courses</Link> | <Link to="/add">Add Course</Link>
    </nav>
  );
}
