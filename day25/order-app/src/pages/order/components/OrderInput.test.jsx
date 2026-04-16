import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderInput from "./OrderInput";

describe("OrderInput Component", () => {
  it("calls onAdd with correct data and clears inputs on submit", () => {
    const mockOnAdd = vi.fn();
    render(<OrderInput onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/e.g. Laptop/i), { target: { value: "MacBook" } });
    fireEvent.change(screen.getByPlaceholderText(/₹/i), { target: { value: "100000" } });
    fireEvent.change(screen.getByLabelText(/Qty/i), { target: { value: "2" } });

    fireEvent.click(screen.getByText(/Add to List/i));

    expect(mockOnAdd).toHaveBeenCalledWith({
      item: "MacBook",
      price: 100000,
      quantity: 2,
    });

    expect(screen.getByPlaceholderText(/e.g. Laptop/i).value).toBe("");
  });
});