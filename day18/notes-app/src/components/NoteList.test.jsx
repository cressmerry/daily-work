import { render, screen } from "@testing-library/react";
import NoteList from "./NoteList";

test("renders notes", () => {
  const notes = [
    { id: 1, title: "Note 1", status: "closed" },
    { id: 2, title: "Note 2", status: "open" },
  ];
  render(<NoteList notes={notes} deleteNote={() => {}} />);
  expect(screen.getByText(/Note 1/i)).toBeInTheDocument();
  expect(screen.getByText(/closed/i)).toBeInTheDocument();
  expect(screen.getByText(/Note 2/i)).toBeInTheDocument();
  expect(screen.getByText(/open/i)).toBeInTheDocument();
});
