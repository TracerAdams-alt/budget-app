import { useState, useEffect } from 'react';

const IncomeTracker = ({ onIncomeUpdate }) => {
  const [paycheckAmount, setPaycheckAmount] = useState(() => {
    return localStorage.getItem("paycheckAmount") || "";
  });

  const [incomeHistory, setIncomeHistory] = useState(() => {
    const savedHistory = localStorage.getItem("incomeHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [isEditing, setIsEditing] = useState(() => {
    const saved = localStorage.getItem("paycheckAmount");
    return !saved || saved === "0";
  });

  useEffect(() => {
    localStorage.setItem("paycheckAmount", paycheckAmount);
  }, [paycheckAmount]);

  useEffect(() => {
    localStorage.setItem("incomeHistory", JSON.stringify(incomeHistory));
  }, [incomeHistory]);

  // Auto-add income every 2 weeks (disabled while editing)
  useEffect(() => {
    const interval = setInterval(() => {
      if (paycheckAmount && !isEditing) {
        const newIncome = {
          id: Date.now(),
          amount: parseFloat(paycheckAmount),
          date: new Date().toLocaleDateString(),
        };

        setIncomeHistory(prev => [...prev, newIncome]);
        onIncomeUpdate(parseFloat(paycheckAmount));
      }
    }, 1000 * 60 * 60 * 24 * 14); // 2 weeks

    return () => clearInterval(interval);
  }, [paycheckAmount, isEditing, onIncomeUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paycheckAmount || isNaN(paycheckAmount)) return;

    const newIncome = {
      id: Date.now(),
      amount: parseFloat(paycheckAmount),
      date: new Date().toLocaleDateString(),
    };

    setIncomeHistory(prev => [...prev, newIncome]);
    onIncomeUpdate(parseFloat(paycheckAmount));
    setIsEditing(false);
    setPaycheckAmount(""); // Clear input after saving
  };

  const handleEdit = (id) => {
    const entry = incomeHistory.find(income => income.id === id);
    if (entry) {
      setPaycheckAmount(entry.amount);
      setIsEditing(true);
      setIncomeHistory(prev => prev.filter(income => income.id !== id));
    }
  };

  const handleDelete = (id) => {
    const updated = incomeHistory.filter(income => income.id !== id);
    setIncomeHistory(updated);
  };

  return (
    <div>
      <h2>Income Tracker</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>Paycheck Amount:</label>
          <input
            type="number"
            value={paycheckAmount}
            onChange={(e) => setPaycheckAmount(e.target.value)}
            placeholder="Enter paycheck amount"
          />
          <button type="submit">Save Income</button>
        </form>
      ) : (
        <div>
          <p>Paycheck Amount: ${parseFloat(paycheckAmount).toFixed(2)}</p>
          <button id='edit' onClick={() => setIsEditing(true)}>Edit Income Info</button>
        </div>
      )}

      <div>
        <h3>Income History:</h3>
        <ul>
          {incomeHistory.map((income) => (
            <li key={income.id}>
              ${income.amount.toFixed(2)} on {income.date}
              <button onClick={() => handleEdit(income.id)}>Edit</button>
              <button onClick={() => handleDelete(income.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeTracker;
