import { render, screen, fireEvent } from "@testing-library/react";
import NoteItem from "./NoteItem";

test("calls delete on button click", () => {
  const deleteNote = jest.fn();
  const note = { id: 1, text: "Test" };
  render(<NoteItem note={note} deleteNote={deleteNote} />);
  fireEvent.click(screen.getByText(/✖/i));
  expect(deleteNote).toHaveBeenCalledWith(1);
});
