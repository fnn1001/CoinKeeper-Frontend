// COMPONENTS
import { useEffect, useState } from "react";
import BudgetCard from "../BudgetCard/BudgetCard";

const UncategorizedBudgetCard = (props) => {
  const { uncategorizedExpenses } = props;

  const amount = uncategorizedExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
};

export default UncategorizedBudgetCard;
