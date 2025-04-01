import { useState } from "react";

export default function ExpenseForm({ setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };

    setExpenses(prev => [...prev, newExpense]);
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        placeholder="Expense title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add Expense
      </button>
    </form>
  );
}
