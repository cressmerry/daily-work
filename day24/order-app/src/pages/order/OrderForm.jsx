import { useState } from "react";
import { placeOrder } from "../../utils/api";
import OrderInput from "./components/OrderInput";
import OrderList from "./components/OrderList";
import OrderTable from "./components/OrderTable";

function OrderForm() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [refreshKey, setRefreshKey] = useState(0);

  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
    setStatus({ type: "", message: "" });
  };

  const removeOrder = (index) => {
    setOrders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = async () => {
    setStatus({ type: "info", message: "Sending order..." });
    try {
      await placeOrder(orders);
      setStatus({
        type: "success",
        message: "Order placed successfully!",
      });
      setOrders([]);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      setStatus({ type: "error", message: "Failed to place order." });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto mt-10 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Create Order
            </h2>
            <OrderInput onAdd={addOrder} />
            <hr className="mb-6" />
            <OrderList items={orders} onRemove={removeOrder} />
            {orders.length > 0 && (
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform active:scale-95"
              >
                Submit Final Order
              </button>
            )}
            {status.message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  status.type === "error"
                    ? "text-red-500"
                    : status.type === "success"
                      ? "text-green-600"
                      : "text-blue-500"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
        <div className="lg:col-span-3">
          <OrderTable key={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
