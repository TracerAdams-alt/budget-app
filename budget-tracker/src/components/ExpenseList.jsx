export default function ExpenseList({ expenses, onDelete }) {
    return (
      <div className="expenses">
        <h2>Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              <span>{expense.title}</span>
              <span>${expense.amount.toFixed(2)}</span>
              <button onClick={() => onDelete(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  