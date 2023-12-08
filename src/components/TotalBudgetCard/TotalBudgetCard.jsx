// COMPONENTS
import BudgetCard from "../BudgetCard/BudgetCard";

const calculateAmountExpenses = (expenses) =>
  expenses.reduce((acc, curr) => acc + curr.amount, 0);

const TotalBudgetCard = (props) => {
  const { budgets, unCategorizedExpenses } = props;

  const uncategorizedAmount = calculateAmountExpenses(unCategorizedExpenses);

  const budgetAmount = budgets.reduce(
    (acc, budget) => acc + calculateAmountExpenses(budget.expenses),
    0
  );

  const totalExpenses = budgetAmount + uncategorizedAmount; // TODO on calcul toute les expenses de chaque budget

  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;

  return (
    <BudgetCard
      amount={totalExpenses}
      name="Total"
      gray
      max={max}
      hideButtons={true}
    />
  );
};

export default TotalBudgetCard;
