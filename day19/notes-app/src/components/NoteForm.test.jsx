import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NoteForm from "./NoteForm";
import api from "../api";

jest.mock("../api");

describe("NoteForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("adds note on clicking the Add Button", async () => {
    const mockResponse = { 
      id: 123, 
      title: "Test Note Title", 
      content: "Test Note Content",
      completion_time: "2099-01-01T10:00:00.000Z"
    };

    api.post.mockResolvedValue({ data: mockResponse });
    
    const addNote = jest.fn();
    render(<NoteForm addNote={addNote} />);

    fireEvent.change(screen.getByPlaceholderText(/enter title/i), {
      target: { name: "title", value: "Test Note Title" },
    });
    
    fireEvent.change(screen.getByPlaceholderText(/enter content/i), {
      target: { name: "content", value: "Test Note Content" },
    });

    const futureDate = "2099-01-01T10:00";
    fireEvent.change(screen.getByLabelText(/completion time/i), {
      target: { name: "completionTime", value: futureDate },
    });

    fireEvent.click(screen.getByText(/add note/i));

    await waitFor(() => {
      expect(addNote).toHaveBeenCalledWith({
        ...mockResponse,
        status: "created",
      });
    });

    expect(api.post).toHaveBeenCalledWith("/notes", {
      title: "Test Note Title",
      content: "Test Note Content",
      completion_time: new Date(futureDate).toISOString(),
    });
  });
});