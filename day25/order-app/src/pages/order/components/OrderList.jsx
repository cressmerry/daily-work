import Item from "./Item";

function OrderList({ items, onRemove }) {
  const total = items.reduce((sum, obj) => sum + (obj.price * obj.quantity), 0);

  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-700">Items ({items.length})</h3>
        {items.length > 0 && (
          <span className="text-sm font-bold text-slate-600">Total: ₹{total.toLocaleString()}</span>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400 italic">No items added.</p>
      ) : (
        items.map((obj, index) => (
          <Item
            key={index}
            item={obj.item}
            price={obj.price}
            quantity={obj.quantity}
            onRemove={() => onRemove(index)}
          />
        ))
      )}
    </div>
  );
}

export default OrderList;