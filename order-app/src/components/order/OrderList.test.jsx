import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OrderList from "./OrderList";

describe("OrderList Component", () => {
  const mockItems = [
    { item: "Mouse", price: 200, quantity: 1 },
    { item: "Monitor", price: 5000, quantity: 2 },
  ];
  it("shows empty state message when no items are provided", () => {
    render(<OrderList items={[]} />);
    expect(screen.getByText(/no items added/i)).toBeInTheDocument();
  });
  it("renders a list of items and calculates the correct total", () => {
    render(<OrderList items={mockItems} />);
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("Monitor")).toBeInTheDocument();
    expect(screen.getByText(/Total: ₹10,200/i)).toBeInTheDocument();
  });
});