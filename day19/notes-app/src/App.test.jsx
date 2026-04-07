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
    

  });
});
