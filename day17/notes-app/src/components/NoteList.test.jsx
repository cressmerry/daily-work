import { render, screen } from "@testing-library/react";
import NoteList from "./NoteList";

test("renders notes", () => {
  const notes = [
    { id: 1, title: "Note 1", status: "Note 1 Status" },
    { id: 2, title: "Note 2", status: "Note 2 Status" },
  ];
  render(<NoteList notes={notes} deleteNote={() => {}} />);
  expect(screen.getByText("Note 1 Status:Note 1 Status")).toBeInTheDocument();
  expect(screen.getByText("Note 2 Status:Note 2 Status")).toBeInTheDocument();
  expect(screen.getByText("Note 2 Status:Note 2 Status")).toBeInTheDocument();

});
