import { useNavigate } from "react-router-dom";

function Order({ id, items }) {
  const navigate = useNavigate();
  
  const total = items?.reduce((sum, obj) => sum + (obj.price * (obj.quantity || 1)), 0) || 0;
  const displayNames = items?.slice(0, 3).map((obj) => obj.item);
  const hasMore = items?.length > 3;

  const safeId = String(id || "");

  return (
    <div
      onClick={() => navigate(`/order/${id}`)}
      className="group border border-slate-200 rounded-2xl p-6 bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Reference</span>
          <p className="text-xl font-mono font-bold text-slate-800">
            #{safeId.length > 6 ? safeId.slice(-6) : safeId}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 font-bold uppercase">{items?.length || 0} Items</p>
          <p className="text-2xl font-black text-slate-900">₹{total.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 mb-4">
        <p className="text-sm font-medium text-slate-600 truncate">
          {displayNames?.length > 0 ? (
            <>
              {displayNames.join(", ")}
              {hasMore && <span className="text-blue-500 ml-1">+{items.length - 3} more</span>}
            </>
          ) : "No items listed"}
        </p>
      </div>

      <div className="flex items-center text-blue-600 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
        View Order Details <span>&rarr;</span>
      </div>
    </div>
  );
}

export default Order;