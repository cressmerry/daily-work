import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrders } from "../../utils/api";
import Item from "./components/Item";

function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrders();
        const found = data.find((o) => String(o.id) === id);
        setOrder(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">Loading Order...</div>
    );
  }

  if (!order) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">Order not found.</p>
        <Link to="/" className="text-blue-600">
          Return Home
        </Link>
      </div>
    );
  }

  const total = order.orderLines?.reduce((sum, obj) => sum + obj.price, 0) || 0;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Link
        to="/order"
        className="text-sm text-slate-500 hover:text-blue-600 mb-6 inline-block"
      >
        &larr; Back to History
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-8 border-b border-slate-200">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Order Summary
              </h1>
              <p className="text-blue-600 font-mono mt-1">Ref: #{id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 uppercase font-semibold">
                Total Paid
              </p>
              <p className="text-3xl font-bold text-slate-900">₹{total}</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h3 className="font-bold text-slate-800 mb-4">Items Ordered</h3>
          <div className="space-y-3">
            {order.orderLines?.map((ol, index) => (
              <Item
                key={index}
                item={ol.item}
                price={ol.price}
                isReadOnly={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
