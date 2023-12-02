import { Button } from "../../../../components/Button/Button";

import "./BudgetActions.css";

export const BudgetActions = (props) => {
  const { onAddBudget, onAddExpense } = props;

  const handleAddBudget = () => {
    onAddBudget();
  };

  const handleAddExpense = () => {
    onAddExpense();
  };

  return (
    <div className="budgetActionsWrapper">
      <Button
        label="Add Budget"
        onClick={handleAddBudget}
      />
      <Button
        label="Add Expense"
        onClick={handleAddExpense}
      />
    </div>
  );
};
