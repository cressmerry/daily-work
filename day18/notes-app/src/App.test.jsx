import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import api from "./api";

jest.mock("./api");
describe("App Component", () => {
  test("adds and deletes note", async () => {
    api.get.mockResolvedValue({ data: [] });
    api.post.mockResolvedValue({
      data: {
        id: 1,
        title: "New Note",
        content: "New Content",
        status: "created",
      },
    });
    api.delete.mockResolvedValue({});

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/enter title/i), {
      target: { value: "New Note" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter content/i), {
      target: { value: "New Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add note/i }));

    const noteTitle = await screen.findByText("New Note");
    expect(noteTitle).toBeInTheDocument();

    const deleteButton = screen.getByText("✖");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("New Note")).not.toBeInTheDocument();
    });

    expect(api.delete).toHaveBeenCalledWith("/notes/1/");
  });
});
