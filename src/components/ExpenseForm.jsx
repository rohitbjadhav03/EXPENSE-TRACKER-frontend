const ExpenseForm = ({ form, setForm, handleSubmit, editingId }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mb-10"
    >
      <h2 className="text-xl font-semibold mb-3 text-center">
        {editingId ? "✏️ Edit Expense" : "➕ Add Expense"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-2 rounded"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Category"
        className="border p-2 w-full mb-2 rounded"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="date"
        className="border p-2 w-full mb-3 rounded"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <button
        type="submit"
        className={`${
          editingId
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white py-2 px-4 rounded w-full`}
      >
        {editingId ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
