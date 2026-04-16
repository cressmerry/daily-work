import { useState } from "react";

function OrderInput({ onAdd }) {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!item || !price || quantity < 1) return;
    onAdd({ item, price: parseFloat(price), quantity: parseInt(quantity) });
    setItem("");
    setPrice("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleAdd} className="space-y-4 mb-6">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
          Item Name
        </label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g. Laptop"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="₹"
          />
        </div>
        <div>
          <label
            htmlFor="qty-input"
            className="block text-xs font-bold text-slate-500 uppercase mb-1"
          >
            Qty
          </label>
          <input
            id="qty-input"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            min="1"
            step="1"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition-colors font-medium"
      >
        Add to List
      </button>
    </form>
  );
}

export default OrderInput;
