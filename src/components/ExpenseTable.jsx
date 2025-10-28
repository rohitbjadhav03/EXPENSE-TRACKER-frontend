const ExpenseTable = ({ expenses, handleEdit, handleDelete }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">All Expenses</h2>
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td className="p-2 border">{exp.title}</td>
              <td className="p-2 border">₹{exp.amount}</td>
              <td className="p-2 border">{exp.category}</td>
              <td className="p-2 border">
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
