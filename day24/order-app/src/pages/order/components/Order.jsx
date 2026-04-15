import { useNavigate } from "react-router-dom";

function Order({ id, items }) {
  const navigate = useNavigate();
  const total = items?.reduce((sum, obj) => sum + obj.price, 0) || 0;

  const displayNames = items?.slice(0, 3).map((obj) => obj.item);
  const hasMore = items?.length > 3;

  return (
    <div
      onClick={() => navigate(`/order/${id}`)}
      className="group border border-slate-200 rounded-xl p-5 bg-white shadow-sm hover:border-blue-500 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Order ID
          </span>
          <p className="text-lg font-mono font-bold text-slate-800">#{id}</p>

          <div className="mt-2">
            <p className="text-sm font-medium text-slate-600">
              {displayNames?.length > 0 ? (
                <>
                  {displayNames.join(", ")}
                  {hasMore && (
                    <span className="text-slate-400">
                      {" "}
                      + {items.length - 3} more
                    </span>
                  )}
                </>
              ) : (
                "No items listed"
              )}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">{items?.length || 0} Items</p>
          <p className="text-xl font-bold text-slate-900">
            ₹{total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
        <span className="text-sm font-medium text-blue-500 group-hover:translate-x-1 transition-transform">
          View Details &rarr;
        </span>
      </div>
    </div>
  );
}

export default Order;
