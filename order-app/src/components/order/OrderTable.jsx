import { useEffect, useState } from "react";
import { getOrders } from "../../utils/api";
import Order from "./Order";

function OrderTable() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getOrders();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-full">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Order History</h2>
      {loading ? (
        <p className="text-center text-slate-400 py-10">Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-slate-400 py-10 italic">
          No orders found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[80vh] pr-2">
          {history.map((order) => (
            <Order key={order.id} id={order.id} items={order.orderLines} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTable;
