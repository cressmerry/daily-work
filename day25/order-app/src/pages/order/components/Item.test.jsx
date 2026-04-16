import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Item from "./Item";

describe("Item Component", () => {
  const mockProps = {
    item: "Keyboard",
    price: 500,
    quantity: 2,
    onRemove: vi.fn(),
  };

  it("renders item details and total price correctly", () => {
    render(<Item {...mockProps} />);
    expect(screen.getByText("Keyboard")).toBeInTheDocument();
    expect(screen.getByText("x2")).toBeInTheDocument();
    expect(screen.getByText("₹1000")).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", () => {
    render(<Item {...mockProps} />);
    const removeBtn = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeBtn);
    expect(mockProps.onRemove).toHaveBeenCalled();
  });

  it("hides the remove button when isReadOnly is true", () => {
    render(<Item {...mockProps} isReadOnly={true} />);
    expect(screen.queryByRole("button", { name: /remove/i })).not.toBeInTheDocument();
  });
});