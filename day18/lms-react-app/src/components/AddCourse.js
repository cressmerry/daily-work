import { useState } from "react";
import { addCourse } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse({ title, description });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
