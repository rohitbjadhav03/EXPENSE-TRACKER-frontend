import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D72638"];

const ExpenseChart = ({ expenses }) => {
  const categories = [...new Set(expenses.map((e) => e.category))];
  const categoryData = categories.map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  if (categoryData.length === 0) return null;

  return (
    <div className="flex justify-center mt-10">
      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {categoryData.map((_, i) => (
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
