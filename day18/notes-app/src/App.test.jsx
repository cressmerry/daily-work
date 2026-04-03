import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("adds and deletes note", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/enter title/i), {
    target: { value: "New Note" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter content/i), {
    target: { value: "New Content" },
  });
  fireEvent.click(screen.getByText(/add/i));

  const noteTitle = await screen.findByText("New Note");
  expect(noteTitle).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText("New Note")).not.toBeInTheDocument();
  });
});