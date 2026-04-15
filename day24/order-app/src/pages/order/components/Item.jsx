function Item({ item, price, quantity, onRemove, isReadOnly = false }) {
  return (
    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
      <div>
        <span className="font-medium text-slate-800">{item}</span>
        <span className="ml-2 text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">x{quantity}</span>
        <span className="ml-2 text-slate-500 text-sm">₹{price * quantity}</span>
      </div>
      {!isReadOnly && (
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default Item;