// DEPENDENCIES
import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { API_BASE_URL } from "../config/config.js";


const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses= (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  const addBudget = ({ name, max })=> {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

   const deleteBudget = ({ id: budgetIdToDelete }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== budgetIdToDelete) return expense;

        const updatedExpense = { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
        return updatedExpense;
      });
    }); 

    setBudgets((prevBudgets) => {
      if (budgetIdToDelete !== undefined) {
        return prevBudgets.filter((budget) => budget.id !== budgetIdToDelete);
      }
      return prevBudgets;
    });
  }

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
