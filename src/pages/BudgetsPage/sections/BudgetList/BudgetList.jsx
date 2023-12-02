import BudgetCard from "../../../../components/BudgetCard/BudgetCard";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../../../context/BudgetsContext";

export const BudgetList = (props) => {
  const { budgets: budgetsProps, onAddExpense, onViewExpenses } = props;
  const { budgets, getBudgetExpenses } = useBudgets();

  const calculateTotalExpense = (budget) => {
    const expenses = getBudgetExpenses(budget.id);

    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const handleAddExpenses = (id) => {
    onAddExpense(id)
  }

  const handleViewExpenses = (id) => {
    onViewExpenses(id)
  }
  console.log(budgetsProps.map((budget) => calculateTotalExpense(budget)));

  return (
    <ul>
      {budgetsProps.map((budget) => (
        <li key={budget.id}>
          <BudgetCard
            name={budget.name}
            amount={calculateTotalExpense(budget)}
            max={budget.max}
            onAddExpenseClick={() => handleAddExpenses(budget.id)}
            onViewExpensesClick={() => handleViewExpenses(budget.id)}
          />
        </li>
      ))}
      
    </ul>
  );
};
