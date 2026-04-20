import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../utils/api";

function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-slate-500 italic">Loading...</div>;
  if (!order) return <div className="p-10 text-center"><Link to="/order" className="text-blue-600 underline">Order not found.</Link></div>;

  const total = order.orderLines?.reduce((sum, obj) => sum + (obj.price * obj.quantity), 0) || 0;

  return (
    <div className="max-w-4xl mx-auto p-4 md:mt-6">
      <Link to="/order" className="text-xs text-slate-500 hover:text-blue-600 mb-4 inline-block">&larr; Back to History</Link>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Order Summary</h1>
            <p className="text-blue-600 font-mono text-xs">Ref: #{id}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Amount</p>
            <p className="text-2xl font-black text-slate-900">₹{total.toLocaleString()}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="md:col-span-2 p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-tight">Items Ordered</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {order.orderLines?.map((orderline, index) => (
                <div key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 transition-hover hover:border-slate-300">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{orderline.item}</p>
                    <p className="text-xs text-slate-500 italic">{orderline.quantity} × ₹{orderline.price}</p>
                  </div>
                  <p className="font-bold text-slate-900 text-sm ml-4">₹{(orderline.price * orderline.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-tight">Shipping</h3>
            <div className="text-sm text-slate-600 leading-relaxed">
              <p className="font-medium text-slate-800">{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}</p>
              <p className="font-mono text-xs text-slate-400">{order.shippingAddress?.zipCode}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderPage;