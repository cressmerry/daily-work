import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("adds and deletes note", () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/enter note/i), {
    target: { value: "New Note" },
  });
  fireEvent.click(screen.getByLabelText(/status/i));
  fireEvent.click(screen.getByText(/add/i));
  expect(
    screen.getByText("New Note Status:closed"),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText(/delete/i));
  expect(
    screen.queryByText("New Note Status:closed"),
  ).not.toBeInTheDocument();
});
