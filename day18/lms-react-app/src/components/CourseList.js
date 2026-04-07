import { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import { Link } from "react-router-dom";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(res => setCourses(res.data));
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {courses.map(c => (
        <div key={c.id}>
          <Link to={`/course/${c.id}`}>{c.title}</Link>
        </div>
      ))}
    </div>
  );
}
