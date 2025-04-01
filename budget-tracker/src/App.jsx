import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";

export default function App() {
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-red-500">If this is red, Tailwind is working!</h1>
        <h1 className="text-2xl font-bold mb-4 text-center">Budget Tracker</h1>
        <ExpenseForm setExpenses={setExpenses} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}
