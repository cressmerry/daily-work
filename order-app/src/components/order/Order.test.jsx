import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Order from "./Order";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Order Component (Card)", () => {
  const mockItems = [
    { item: "A", price: 100 },
    { item: "B", price: 100 },
    { item: "C", price: 100 },
    { item: "D", price: 100 },
  ];

  it("displays order ID and first three items with 'more' count", () => {
    render(<Order id="123" items={mockItems} />, { wrapper: BrowserRouter });
    expect(screen.getByText("#123")).toBeInTheDocument();
    expect(screen.getByText(/A, B, C/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ 1 more/i)).toBeInTheDocument();
  });
  it("navigates to the detail page when clicked", () => {
    render(<Order id="123" items={mockItems} />, { wrapper: BrowserRouter });
    const card = screen.getByText("#123").closest("div.group");
    fireEvent.click(card);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/order/123");
  });
});