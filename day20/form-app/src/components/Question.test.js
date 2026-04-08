import { render, screen, fireEvent } from "@testing-library/react";
import Question from "./Question";

const mockQuestions = [
  { qId: 1, qText: "Question One" },
  { qId: 2, qText: "Question Two" },
];

describe("Question Component", () => {
  const mockOnUpdate = jest.fn();

  test("renders dropdown and displays inputs upon selection", () => {
    render(
      <Question
        questions={mockQuestions}
        occupiedIds={[]}
        onUpdate={mockOnUpdate}
        index={0}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    expect(screen.getByPlaceholderText("Your Answer")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Answer")).toBeInTheDocument();
  });

  test("validates character length requirement", () => {
    render(
      <Question
        questions={mockQuestions}
        occupiedIds={[]}
        onUpdate={mockOnUpdate}
        index={0}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    const input = screen.getByPlaceholderText("Your Answer");

    fireEvent.change(input, { target: { value: "123" } });
    expect(screen.getByText("Min 5 characters required")).toBeInTheDocument();
  });

  test("validates that answers match", () => {
    render(
      <Question
        questions={mockQuestions}
        occupiedIds={[]}
        onUpdate={mockOnUpdate}
        index={0}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("Your Answer"), {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Answer"), {
      target: { value: "Mismatch123" },
    });

    expect(screen.getByText("Answers must match exactly")).toBeInTheDocument();
  });

  test("executes onUpdate when inputs are valid", () => {
    render(
      <Question
        questions={mockQuestions}
        occupiedIds={[]}
        onUpdate={mockOnUpdate}
        index={0}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("Your Answer"), {
      target: { value: "SecurePass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Answer"), {
      target: { value: "SecurePass" },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith(0, "1", "SecurePass");
  });
});
