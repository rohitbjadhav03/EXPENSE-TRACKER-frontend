import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseChart from "./components/ExpenseChart";

const API_URL = "import.meta.env.VITE_API_URL;"; // replace with Render URL after deploy

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category || !form.date) return;

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({ title: "", amount: "", category: "", date: "" });
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.split("T")[0],
    });
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categories = [...new Set(expenses.map((e) => e.category))];

  const filtered = filterCategory
    ? expenses.filter((e) => e.category === filterCategory)
    : expenses;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        💰 Expense Tracker
      </h1>

      <ExpenseForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <ExpenseFilter
        categories={categories}
        total={total}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <ExpenseTable
        expenses={filtered}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default App;
