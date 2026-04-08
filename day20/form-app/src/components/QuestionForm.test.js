import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuestionForm from "./QuestionForm";
import api from "../utils/api";

jest.mock("../utils/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const mockData = [
  { qId: "1", qText: "First Question" },
  { qId: "2", qText: "Second Question" },
];

describe("QuestionForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.get.mockResolvedValue({ data: mockData });
  });

  test("fetches data and renders correct number of questions", async () => {
    render(<QuestionForm />);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/questions");
    });

    const items = screen.getAllByText(/Security Question/i);
    expect(items).toHaveLength(1);
  });

  test("toggles input visibility via checkbox", async () => {
    render(<QuestionForm />);
    const checkbox = await screen.findByLabelText(/Hide Answer\(s\)/i);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test("submits valid form data to api", async () => {
    api.post.mockResolvedValue({ status: 200 });
    render(<QuestionForm />);

    await waitFor(() => screen.getAllByRole("combobox"));
    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], { target: { value: "1" } });
    fireEvent.change(screen.getAllByPlaceholderText("Your Answer")[0], {
      target: { value: "ValidInput" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Confirm Answer")[0], {
      target: { value: "ValidInput" },
    });

    fireEvent.change(selects[1], { target: { value: "2" } });
    fireEvent.change(screen.getAllByPlaceholderText("Your Answer")[1], {
      target: { value: "ValidInput" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Confirm Answer")[1], {
      target: { value: "ValidInput" },
    });

    const submitBtn = screen.getByRole("button", { name: /Update Profile/i });
    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(submitBtn);

    expect(api.post).toHaveBeenCalledWith("/submissions", {
      submissions: [
        { qId: "1", submission: "ValidInput" },
        { qId: "2", submission: "ValidInput" },
      ],
    });
  });
});
