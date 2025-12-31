import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseChart from "./components/ExpenseChart";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  // Debug logging to check API endpoint
  useEffect(() => {
    console.log("🔗 API_URL loaded:", API_URL);
  }, []);

  // ✅ FIXED: Fetch Expenses - ADDED /api/expenses
  const fetchExpenses = async () => {
    try {
      console.log("📡 Fetching from:", `${API_URL}/api/expenses`);
      const res = await axios.get(`${API_URL}/api/expenses`);  // ← CHANGED

      console.log("✅ Response received:", res.data);

      if (Array.isArray(res.data)) {
        setExpenses(res.data);
      } else {
        console.warn("⚠️ Unexpected API response, got:", res.data);
        setExpenses([]);
      }
    } catch (error) {
      console.error("❌ Error fetching expenses:", error.message, error);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ FIXED: Add or Update Expense - ADDED /api/expenses + Number(amount)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category || !form.date) return;

    try {
      const expenseData = {
        title: form.title,
        amount: Number(form.amount),  // ← FIXED: Convert to number
        category: form.category,
        date: form.date,              // ← YYYY-MM-DD format
      };

      if (editingId) {
        // ✅ FIXED: PUT /api/expenses/:id
        await axios.put(`${API_URL}/api/expenses/${editingId}`, expenseData);
        setEditingId(null);
      } else {
        // ✅ FIXED: POST /api/expenses
        await axios.post(`${API_URL}/api/expenses`, expenseData);
      }
      setForm({ title: "", amount: "", category: "", date: "" });
      fetchExpenses();
    } catch (err) {
      console.error("❌ Error submitting expense:", err.message, err);
    }
  };

  // ✅ FIXED: Delete Expense - ADDED /api/expenses
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/expenses/${id}`);  // ← CHANGED
      fetchExpenses();
    } catch (err) {
      console.error("❌ Error deleting expense:", err.message, err);
    }
  };

  // Edit Expense
  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.split("T")[0],
    });
  };

  // Safe calculations
  const total =
    Array.isArray(expenses) && expenses.length > 0
      ? expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
      : 0;

  const categories = Array.isArray(expenses)
    ? [...new Set(expenses.map((e) => e.category))]
    : [];

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
      <ExpenseChart expenses={Array.isArray(expenses) ? expenses : []} />
    </div>
  );
}

export default App;
