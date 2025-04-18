import { useState, useEffect } from 'react';

const BalanceTracker = ({ expenses }) => {
  const [incomeHistory, setIncomeHistory] = useState(() => {
    const saved = localStorage.getItem("incomeHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalIncome = incomeHistory.reduce((sum, income) => sum + income, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const newBalance = totalIncome - totalExpenses;
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);
  }, [incomeHistory, expenses]);

  // This function gets called from IncomeTracker
  const addIncome = (amount) => {
    setIncomeHistory(prev => {
      const updated = [...prev, amount];
      localStorage.setItem("incomeHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div>
      <h2>Balance Tracker</h2>
      <p>Current Balance: ${balance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceTracker;
