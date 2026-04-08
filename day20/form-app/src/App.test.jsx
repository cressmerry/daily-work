import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/QuestionForm", () => () => (
  <div data-testid="form-wrapper">Form Content</div>
));

describe("App Component", () => {
  test("renders QuestionForm child", () => {
    render(<App />);
    expect(screen.getByTestId("form-wrapper")).toBeInTheDocument();
  });
});
