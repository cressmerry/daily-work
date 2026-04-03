import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NoteItem from "./NoteItem";
import api from "../api";

jest.mock("../api");

describe("NoteItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("tests for the delete button", async () => {
    api.delete.mockResolvedValue({});
    const deleteNote = jest.fn();
    const note = { id: 1, title: "Test", content: "Test Content", status: "created" };
    
    render(<NoteItem note={note} deleteNote={deleteNote} closeNote={() => {}} />);
    
    fireEvent.click(screen.getByText(/✖/i));
    
    await waitFor(() => {
      expect(deleteNote).toHaveBeenCalledWith(1);
    });
    expect(api.delete).toHaveBeenCalledWith("/notes/1/");
  });

  test("tests for the close button", async () => {
    api.put.mockResolvedValue({ data: { status: "closed" } });
    const closeNote = jest.fn();
    const note = { id: 1, title: "Test", content: "Test Content", status: "created" };
    
    render(<NoteItem note={note} deleteNote={() => {}} closeNote={closeNote} />);
    
    fireEvent.click(screen.getByText(/✔/i));
    
    await waitFor(() => {
      expect(closeNote).toHaveBeenCalledWith(1);
    });

    expect(api.put).toHaveBeenCalledWith("/notes/1/", { status: "closed" });
  });
});