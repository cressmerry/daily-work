import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import OrderTable from "./OrderTable";
import * as api from "../../../utils/api";

vi.mock("../../../utils/api");

describe("OrderTable Component", () => {
  it("shows loading state then displays list of orders", async () => {
    const mockHistory = [
      { id: "1", orderLines: [{ item: "Item 1", price: 10 }] },
      { id: "2", orderLines: [{ item: "Item 2", price: 20 }] },
    ];
    api.getOrders.mockResolvedValue(mockHistory);
    render(<OrderTable />, { wrapper: BrowserRouter });
    expect(screen.getByText(/loading history/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("#1")).toBeInTheDocument();
      expect(screen.getByText("#2")).toBeInTheDocument();
    });
  });

  it("shows empty state if API returns no orders", async () => {
    api.getOrders.mockResolvedValue([]);
    render(<OrderTable />, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.getByText(/no orders found/i)).toBeInTheDocument();
    });
  });
});