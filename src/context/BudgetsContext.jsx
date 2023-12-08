// DEPENDENCIES
import React, { useContext, useState } from "react";
import axios from "axios";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const callAPIGetAllBudgets = async () => {
    try {
      const URL = `${process.env.REACT_APP_SERVER_URL}/budgets`
      const response = await axios.get(URL);

      setBudgets(response.data);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setError("Error fetching budgets");
    } finally {
      callAPIGetAllExpenses()
    }
  };

  const callAPIGetAllExpenses = async () => {
    try{
      const URL = `${process.env.REACT_APP_SERVER_URL}/expenses`
      const response = await axios.get(URL);

      setExpenses(response.data)
    } catch(e) {
      console.error("Error fetching expenses:", error);
      setError("Error fetching expenses");
    }
  };

  const callAPIAddBudget = async (budget) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/budgets`,
        budget
      );
      setBudgets((prevBudgets) => [...prevBudgets, response.data]);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error("Error adding budget:", error);
      setError("Error adding budget");
    }
  };

  const callAPIDeleteBudget = async (budgetId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/budgets/${budgetId}`);

      setError(null); // Reset error if successful
    } catch (error) {
      console.error("Error deleting budget:", error);
      setError("Error deleting budget");
    } finally {
      callAPIGetAllBudgets()
    }
  };

  const callAPIAddExpense = async (expense) => {
    const { name, amount, budgetId } = expense

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/expenses`, {
        name,
        amount,
        budgetID: budgetId
      });

    } catch (error) {
      
    } finally {
      callAPIGetAllBudgets()
    }
    // appel api pour ajouter une expense a un budgetId
  }

  const callAPIDeleteExpense = async (expenseId) => {

    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/expenses/${expenseId}`);

    } catch (error) {
      
    } finally {
      callAPIGetAllBudgets()
    }
    // appel api pour ajouter une expense a un budgetId
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        error,
        callAPIGetAllBudgets,
        callAPIGetAllExpenses,
        callAPIAddBudget,
        callAPIDeleteBudget,
        callAPIAddExpense,
        callAPIDeleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
