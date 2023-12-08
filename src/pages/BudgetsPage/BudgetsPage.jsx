// STYLES
import "./BudgetsPage.css";
import "../../components/Button/Button.css";
import { Stack, Container, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

// COMPONENTS
import BudgetCard from "../../components/BudgetCard/BudgetCard";
import AddBudgetModal from "../../components/AddBugdetModal/AddBudgetModal";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import UncategorizedBudgetCard from "../../components/UncategorizedBudgetCard/UncategorizedBudgetCard";
import TotalBudgetCard from "../../components/TotalBudgetCard/TotalBudgetCard";
import ViewExpensesModal from "../../components/ViewExpensesModal/ViewExpensesModal";

// CONTEXT
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../context/BudgetsContext";

const BudgetsPage = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    budgets,
    expenses,
    callAPIGetAllBudgets,
    callAPIDeleteBudget,
    callAPIDeleteExpense,
    callAPIAddBudget,
    callAPIAddExpense,
  } = useBudgets();

  useEffect(() => {
    callAPIGetAllBudgets();
  }, []);

  useEffect(() => {
    if (currentBudget) {
      const currentBudgetUpdated = budgets.find(
        (budget) => budget._id === currentBudget._id
      );

      setCurrentBudget(currentBudgetUpdated);
    }
  }, [budgets]);

  const handleAddBudget = (expense) => {
    callAPIAddBudget(expense);
  };

  const handleAddExpense = (expense) => {
    callAPIAddExpense(expense);
  };

  const handleOpenAddExpenseModal = (budget) => {
    setCurrentBudget(budget)
    setShowAddExpenseModal(true);
  };

  const handleOpenAddBudgetModal = () => {
    setShowAddBudgetModal(true);
  };

  const handleOpenViewExpensesModal = (budget) => {
    setShowViewExpenseModal(true)
    
    if (budget === UNCATEGORIZED_BUDGET_ID) {
      const uncategorizedExpenses = expenses.filter(
        (expense) =>
        !expense.budgetID || expense.budgetID === UNCATEGORIZED_BUDGET_ID
      );

      setCurrentBudget({
        name: "Uncategorized",
        id: UNCATEGORIZED_BUDGET_ID,
        expenses: uncategorizedExpenses,
      });
    } else {
      setCurrentBudget(budget);
    }
  };

  const handleViewExpenseModalClose = () => {
    setShowViewExpenseModal(false)
    setCurrentBudget(null)
  } 
    

  // Filter budgets based on search query
  const filteredBudgets = budgets.filter((budget) =>
    budget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uncategorizedExpenses = expenses.filter(
    (expense) =>
      !expense.budgetID || expense.budgetID === UNCATEGORIZED_BUDGET_ID
  );

  return (
    <div>
      <Container className="budget-container">
        <Stack direction="horizontal" gap="2" className="budgets-wrapper">
          <p className="budget-title"> Budgets </p>
          <Button className="buttonWrapper" onClick={handleOpenAddBudgetModal}>
            Add Budget
          </Button>
          <Button className="buttonWrapper" onClick={handleOpenAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div className="search-category">
          <Form.Control
            style={{ width: "630px" }}
            type="text"
            placeholder="Search budget"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="budgets-list">
          {filteredBudgets.map((budget, index) => {
            const amount = budget.expenses.reduce(
              (total, expense) => total + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={index}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => handleOpenAddExpenseModal(budget)}
                onViewExpensesClick={() => handleOpenViewExpensesModal(budget)}
              />
            );
          })}
          <UncategorizedBudgetCard
            uncategorizedExpenses={uncategorizedExpenses}
            onAddExpenseClick={() =>
              handleOpenAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
            onViewExpensesClick={() =>
              handleOpenViewExpensesModal(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard
            budgets={budgets}
            unCategorizedExpenses={uncategorizedExpenses}
          />
        </div>
      </Container>
      <AddBudgetModal
        isShow={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
        onAddBudget={handleAddBudget}
      />
      <AddExpenseModal
        budget={currentBudget}
        isShow={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        onAddExpense={handleAddExpense}
      />
      <ViewExpensesModal
        isShow={showViewExpenseModal}
        budget={currentBudget}
        onClose={handleViewExpenseModalClose}
        onDeleteBudget={callAPIDeleteBudget}
        onDeleteExpense={callAPIDeleteExpense}
      />
    </div>
  );
};

export default BudgetsPage;
