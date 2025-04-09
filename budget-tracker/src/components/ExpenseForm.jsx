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
    <form className="expenseForm" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Expense title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">
        Add Expense
      </button>
    </form>
  );
}
