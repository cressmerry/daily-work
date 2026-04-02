import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("adds and deletes note", () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/enter note/i), {
    target: { value: "New Note" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter status/i), {
    target: { value: "New Note Status" },
  });
  fireEvent.click(screen.getByText(/add/i));
  expect(
    screen.getByText("New Note Status:New Note Status"),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText(/delete/i));
  expect(
    screen.queryByText("New Note Status:New Note Status"),
  ).not.toBeInTheDocument();
});
