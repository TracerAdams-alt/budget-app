export default function ExpenseSummary({ expenses }) {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    
    return (
      <div className="my-4 p-4 bg-gray-200 rounded text-center">
        <h2 className="text-lg font-bold">Total Spending: ${total.toFixed(2)}</h2>
      </div>
    );
  }
  