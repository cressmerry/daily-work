import { render, screen } from "@testing-library/react";
import NoteList from "./NoteList";

test("renders notes", () => {
  const notes = [
    { id: 1, title: "Note 1", content: "Note 1 content" },
    { id: 2, title: "Note 2", content: "Note 2 content" },
  ];
  render(<NoteList notes={notes} deleteNote={() => {}} closeNote={()=>{}}/>);
  expect(screen.getByText("Note 1")).toBeInTheDocument();
  expect(screen.getByText("Note 1 content")).toBeInTheDocument();
  expect(screen.getByText("Note 2")).toBeInTheDocument();
  expect(screen.getByText("Note 2 content")).toBeInTheDocument();
});
