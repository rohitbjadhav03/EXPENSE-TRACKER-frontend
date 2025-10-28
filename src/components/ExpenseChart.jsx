import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D72638"];

const ExpenseChart = ({ expenses }) => {
  // ✅ Handle undefined, null, or invalid data
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No expenses available to display chart 📉
      </p>
    );
  }

  // ✅ Safe mapping
  const categories = [...new Set(expenses.map((e) => e.category))];

  const categoryData = categories.map((cat) => ({
    name: cat || "Uncategorized",
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0),
  }));

  // ✅ If all categories are 0 or invalid, skip rendering chart
  const validData = categoryData.filter((c) => c.value > 0);
  if (validData.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No expense data to visualize 📊
      </p>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <PieChart width={400} height={300}>
        <Pie
          data={validData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {validData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseChart;
