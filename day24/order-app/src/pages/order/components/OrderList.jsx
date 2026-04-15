import Item from "./Item";

function OrderList({ items, onRemove }) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-700">
          Order Items ({items.length})
        </h3>
        {items.length > 0 && (
          <span className="text-sm font-bold text-slate-600">
            Total: ₹{items.reduce((sum, obj) => sum + obj.price, 0)}
          </span>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400 italic">No items added yet.</p>
      ) : (
        items.map((obj, index) => (
          <Item
            key={index}
            item={obj.item}
            price={obj.price}
            onRemove={() => onRemove(index)}
          />
        ))
      )}
    </div>
  );
}

export default OrderList;