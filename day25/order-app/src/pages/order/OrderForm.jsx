import { useState } from "react";
import { placeOrder } from "../../utils/api";
import OrderInput from "./components/OrderInput";
import OrderList from "./components/OrderList";
import OrderTable from "./components/OrderTable";

function OrderForm() {
  const [orderLines, setOrderLines] = useState([]);
  const [address, setAddress] = useState({ street: "", city: "", zipCode: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [refreshKey, setRefreshKey] = useState(0);

  const addLine = (newLine) => {
    setOrderLines((prev) => [...prev, newLine]);
  };

  const removeLine = (index) => {
    setOrderLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    if (!address.street || !address.city || !address.zipCode || orderLines.length === 0) {
      setStatus({ type: "error", message: "Please provide an address and at least one item." });
      return;
    }

    setStatus({ type: "info", message: "Sending order..." });
    try {
      await placeOrder({
        shippingAddress: address,
        orderLines: orderLines
      });
      setStatus({ type: "success", message: "Order placed successfully!" });
      setOrderLines([]);
      setAddress({ street: "", city: "", zipCode: "" });
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
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Create Order</h2>
            
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-slate-700">Shipping Address</h3>
              <input
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleAddressChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="zipCode"
                  placeholder="Zip"
                  value={address.zipCode}
                  onChange={handleAddressChange}
                  className="p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <hr className="mb-6" />
            <OrderInput onAdd={addLine} />
            <hr className="mb-6" />
            <OrderList items={orderLines} onRemove={removeLine} />
            
            {orderLines.length > 0 && (
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform active:scale-95"
              >
                Submit Final Order
              </button>
            )}
            
            {status.message && (
              <p className={`mt-4 text-center text-sm font-medium ${status.type === "error" ? "text-red-500" : status.type === "success" ? "text-green-600" : "text-blue-500"}`}>
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