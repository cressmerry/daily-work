import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import OrderForm from "./OrderForm";
import * as api from "../../utils/api";

vi.mock("../../utils/api");
vi.mock("./OrderTable", () => ({ default: () => <div>Order Table Mock</div> }));

describe("OrderForm Integration", () => {
  it("shows validation error if submitted without address", async () => {
    render(<OrderForm />, { wrapper: BrowserRouter });
    fireEvent.change(screen.getByPlaceholderText(/e.g. Laptop/i), { target: { value: "Test Item" } });
    fireEvent.change(screen.getByPlaceholderText(/₹/i), { target: { value: "10" } });
    fireEvent.click(screen.getByText(/Add to List/i));
    fireEvent.click(screen.getByText(/Submit Final Order/i));
    expect(await screen.findByText(/Please provide an address/i)).toBeInTheDocument();
  });

  it("submits the order and clears the form on success", async () => {
    api.placeOrder.mockResolvedValue({ success: true });
    render(<OrderForm />, { wrapper: BrowserRouter });
    fireEvent.change(screen.getByPlaceholderText("Street"), { target: { value: "123 Main St." } });
    fireEvent.change(screen.getByPlaceholderText("City"), { target: { value: "ABC City" } });
    fireEvent.change(screen.getByPlaceholderText("Zip"), { target: { value: "12345" } });
    fireEvent.change(screen.getByPlaceholderText(/e.g. Laptop/i), { target: { value: "Keyboard" } });
    fireEvent.change(screen.getByPlaceholderText(/₹/i), { target: { value: "500" } });
    fireEvent.click(screen.getByText(/Add to List/i));
    fireEvent.click(screen.getByText(/Submit Final Order/i));
    await waitFor(() => {
      expect(screen.getByText(/Order placed successfully!/i)).toBeInTheDocument();
    });
    expect(api.placeOrder).toHaveBeenCalledWith({
      shippingAddress: { street: "123 Main St.", city: "ABC City", zipCode: "12345" },
      orderLines: [{ item: "Keyboard", price: 500, quantity: 1 }]
    });
    expect(screen.getByPlaceholderText("Street").value).toBe("");
  });
});