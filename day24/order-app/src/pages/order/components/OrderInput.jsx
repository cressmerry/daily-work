import { useState } from "react";

function OrderInput({ onAdd }) {
  const [itemInput, setItemInput] = useState({ item: "", price: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!itemInput.item || !itemInput.price) return;
    onAdd({ ...itemInput, price: Number(itemInput.price) });
    setItemInput({ item: "", price: "" });
  };
  return (
    <form onSubmit={handleAdd} className="space-y-4 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            name="item"
            value={itemInput.item}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Mouse"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={itemInput.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="0"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg border border-slate-300 transition-colors"
      >
        + Add Item to List
      </button>
    </form>
  );
}

export default OrderInput;
