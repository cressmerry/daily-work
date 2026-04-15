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

  if (loading) return <div className="p-10 text-center text-slate-500">Loading Order...</div>;
  if (!order) return <div className="p-10 text-center"><Link to="/order" className="text-blue-600">Order not found. Return Home</Link></div>;

  const total = order.orderLines?.reduce((sum, obj) => sum + (obj.price * obj.quantity), 0) || 0;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Link to="/order" className="text-sm text-slate-500 hover:text-blue-600 mb-6 inline-block">&larr; Back to History</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-8 border-b border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Order Summary</h1>
              <p className="text-blue-600 font-mono mt-1">Ref: #{id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 uppercase font-semibold">Total Amount</p>
              <p className="text-3xl font-bold text-slate-900">₹{total.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2">Shipping Address</h3>
          <p className="text-slate-600">{order.shippingAddress?.street}</p>
          <p className="text-slate-600">{order.shippingAddress?.city}, {order.shippingAddress?.zipCode}</p>
        </div>

        <div className="p-8">
          <h3 className="font-bold text-slate-800 mb-4">Items Ordered</h3>
          <div className="space-y-3">
            {order.orderLines?.map((ol, index) => (
              <div key={index} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{ol.item}</p>
                  <p className="text-sm text-slate-500">Qty: {ol.quantity} × ₹{ol.price}</p>
                </div>
                <p className="font-bold text-slate-900">₹{(ol.price * ol.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;