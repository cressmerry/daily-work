import { render, screen, fireEvent } from "@testing-library/react";
import NoteForm from "./NoteForm";

test("adds note on submit", () => {
  const addNote = jest.fn();
  render(<NoteForm addNote={addNote} />);
  fireEvent.change(screen.getByPlaceholderText(/enter note/i), {
    target: { value: "Test Note" }
  });
  fireEvent.change(screen.getByPlaceholderText(/enter status/i), {
    target: { value: "Test Status" }
  });
  fireEvent.click(screen.getByText(/add/i));
  expect(addNote).toHaveBeenCalledWith({title: "Test Note", status :"Test Status"});
});
