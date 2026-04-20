import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import OrderPage from "./OrderPage";
import * as api from "../../utils/api";

vi.mock("../../utils/api");

describe("OrderPage Detail View", () => {
  it("fetches and displays specific order by ID", async () => {
    const mockOrders = [
      {
        id: "123",
        shippingAddress: {
          street: "Main St",
          city: "Tech City",
          zipCode: "12345",
        },
        orderLines: [{ item: "Mouse", price: 100, quantity: 2 }],
      },
    ];
    api.getOrders.mockResolvedValue(mockOrders);

    render(
      <MemoryRouter initialEntries={["/order/123"]}>
        <Routes>
          <Route path="/order/:id" element={<OrderPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Ref: #123/i)).toBeInTheDocument();
      expect(screen.getByText(/Mouse/i)).toBeInTheDocument();
      const totalElements = screen.getAllByText(/₹200/i);
      expect(totalElements.length).toBeGreaterThan(0);
    });
  });
});
