import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import LoginPage from "./components/LoginPage";
import IncomeTracker from "./components/IncomeTracker";

export default function App() {
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleDeleteExpense = (idToDelete) => {
    setExpenses(prev => prev.filter(expense => expense.id !== idToDelete));
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="body">
      <div>
        <h1 className="title">Budget Tracker</h1>
        <button className="logoutButton" onClick={() => setUser(null)}>Logout</button>
        <ExpenseForm setExpenses={setExpenses} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        <IncomeTracker onIncomeUpdate={(amount) => setTotalIncome(prev => prev + amount)} />
      </div>
    </div>
  );
}
