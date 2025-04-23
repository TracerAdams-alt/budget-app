import { useState, useEffect } from 'react';

const BalanceTracker = ({ expenses }) => {
  const [incomeHistory, setIncomeHistory] = useState(() => {
    const saved = localStorage.getItem("incomeHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalIncome = incomeHistory.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const newBalance = totalIncome - totalExpenses;

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);
  }, [incomeHistory, expenses]);

  return (
    <div>
      <h2>Balance Tracker</h2>
      <p>Current Balance: ${balance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceTracker;
