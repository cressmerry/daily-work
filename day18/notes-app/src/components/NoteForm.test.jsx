import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NoteForm from "./NoteForm";
import api from "../api";

jest.mock("../api");

describe("NoteForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("adds note on submit", async () => {
    api.post.mockResolvedValue({
      data: { id: 123, title: "Test Note Title", content: "Test Note Content" },
    });
    const addNote = jest.fn();
    render(<NoteForm addNote={addNote} />);
    fireEvent.change(screen.getByPlaceholderText(/enter title/i), {
      target: { value: "Test Note Title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter content/i), {
      target: { value: "Test Note Content" },
    });
    fireEvent.click(screen.getByText(/add note/i));
    await waitFor(() => {
      expect(addNote).toHaveBeenCalledWith({
        title: "Test Note Title",
        content: "Test Note Content",
        id: 123,
        status: "created",
      });
    });
  });
});
