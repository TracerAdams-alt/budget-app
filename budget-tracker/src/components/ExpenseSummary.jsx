export default function ExpenseSummary({ expenses }) {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
    return (
      <div className="expenseSummary">
        <h2>Total Spending: ${total.toFixed(2)}</h2>
      </div>
    );
  }
  