import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("adds and deletes note", () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/enter note/i), {
    target: { value: "New Note" },
  });
  fireEvent.click(screen.getByLabelText(/status/i));
  fireEvent.click(screen.getByText(/add/i));
  expect(screen.getByText(/New Note/i)).toBeInTheDocument();
  const statusIndicator = screen.getByTitle("Task Status");
  expect(statusIndicator).toHaveTextContent("closed");
  expect(statusIndicator).toHaveClass("closed-task-indicator");
  fireEvent.click(screen.getByText(/✖/i));
  expect(screen.queryByText(/New Note/i)).not.toBeInTheDocument();
});
