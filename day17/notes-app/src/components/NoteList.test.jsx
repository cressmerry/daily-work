import { render, screen } from "@testing-library/react";
import NoteList from "./NoteList";

test("renders notes", () => {
  const notes = [
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" }
  ];
  render(<NoteList notes={notes} deleteNote={() => {}} />);
  expect(screen.getByText("Note 1")).toBeInTheDocument();
  expect(screen.getByText("Note 2")).toBeInTheDocument();
});
