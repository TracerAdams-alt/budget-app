import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import LoginPage from "./components/LoginPage";
import IncomeTracker from "./components/IncomeTracker";
import BalanceTracker from "./components/BalanceTracker";

export default function App() {
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [totalIncome, setTotalIncome] = useState(
    JSON.parse(localStorage.getItem("totalIncome")) || 0
  ); // ✅ Add this

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

  useEffect(() => {
    localStorage.setItem("totalIncome", totalIncome);
  }, [totalIncome]);

  const handleDeleteExpense = (idToDelete) => {
    setExpenses(prev => prev.filter(expense => expense.id !== idToDelete));
  };

  const handleIncomeUpdate = (amount) => {
    setTotalIncome(prev => prev + amount);
  }; // ✅ Add this

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="body">
      <div className="header">
        <h1 className="title">Budget Tracker</h1>
        <button className="logoutButton" onClick={() => setUser(null)}>Logout</button>
      </div>
  
      <div className="topSection">
        <IncomeTracker onIncomeUpdate={handleIncomeUpdate} />
        <BalanceTracker income={totalIncome} expenses={expenses} />
        <ExpenseSummary expenses={expenses} />
      </div>
  
      <div className="formSection">
        <ExpenseForm setExpenses={setExpenses} />
      </div>
  
      <div className="listSection">
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
      </div>
    </div>
  );
}
