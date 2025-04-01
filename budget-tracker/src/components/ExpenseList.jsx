export default function ExpenseList({ expenses }) {
    return (
      <div>
        <h2 className="text-lg font-bold">Expenses</h2>
        <ul className="mt-2">
          {expenses.map(expense => (
            <li key={expense.id} className="p-2 border-b flex justify-between">
              <span>{expense.title}</span>
              <span className="font-bold">${expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  