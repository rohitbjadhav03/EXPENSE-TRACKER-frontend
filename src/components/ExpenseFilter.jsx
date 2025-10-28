const ExpenseFilter = ({ categories, total, filterCategory, setFilterCategory }) => {
  return (
    <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
      <select
        className="border p-2 rounded"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <p className="font-semibold text-gray-700">Total: ₹{total.toLocaleString()}</p>
    </div>
  );
};

export default ExpenseFilter;
