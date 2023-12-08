// STYLES
import "./BudgetsPage.css";
import "../../components/Button/Button.css"
import { Stack, Container, Button, Form } from "react-bootstrap";
import { useState } from "react";

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
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [addBudgetMondal, setAddBudgetModal] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    console.log("open add expense modal clicked")
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const openAddBudgetModal = (budgetId) => {
    console.log("open add budget modal clicked")
    setShowAddBudgetModal(true)
    setAddBudgetModal(budgetId) 
  };

  const openViewExpensesModal = (budgetId) => {
    console.log("open view expenses modal clicked");
    setViewExpensesModalBudgetId(budgetId);
  };

  // Filter budgets based on search query
  const filteredBudgets = budgets.filter((budget) =>
    budget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Container className="budget-container">
        <Stack direction="horizontal" gap="2" className="budgets-wrapper">
          <p className="budget-title"> Budgets </p>
          <Button
            className="buttonWrapper"
            onClick={openAddBudgetModal}
          >
            Add Budget
          </Button>
          <Button
            className="buttonWrapper"
            onClick={openAddExpenseModal}
          >
            Add Expense
          </Button>
        </Stack>
        <div className="search-category">
          <Form.Control style={{width: "630px"}}
            type="text"
            placeholder="Search budget"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="budgets-list">
          {filteredBudgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  openViewExpensesModal(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
            onViewExpensesClick={() =>
              openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)
            } 
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(false)}
      />
    </div>
  );
};

export default BudgetsPage;
