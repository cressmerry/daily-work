import { render, screen, fireEvent } from "@testing-library/react";
import NoteForm from "./NoteForm";

test("adds note on submit", () => {
  const addNote = jest.fn();
  render(<NoteForm addNote={addNote} />);
  fireEvent.change(screen.getByPlaceholderText(/enter note/i), {
    target: { value: "Test Note" }
  });
  fireEvent.click(screen.getByLabelText(/status/i));
  fireEvent.click(screen.getByText(/add/i));
  expect(addNote).toHaveBeenCalledWith({title: "Test Note", status :"closed"});
});
