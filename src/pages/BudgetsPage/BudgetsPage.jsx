// STYLES
import "./BudgetsPage.css";
import { Stack, Container, Button, Form } from "react-bootstrap";
import { useState } from "react";

// COMPONENTS
import BudgetCard from "../../components/BudgetCard/BudgetCard";
import AddBudgetModal from "../../components/AddBugdetModal/AddBudgetModal";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import UncategorizedBudgetCard from "../../components/UncategorizedBudgetCard/UncategorizedBudgetCard";

// CONTEXT
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../context/BudgetsContext";

const BudgetsPage = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

   // Filter budgets based on search query
   const filteredBudgets = budgets.filter((budget) =>
   budget.name.toLowerCase().includes(searchTerm.toLowerCase())
 );


  return (
    <div>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="budgets-wrapper">
          <p className="budget-title"> Budgets </p>
          <Button variant="primary" className="add-button" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" className="add-button" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
          </Stack>
          <div className="search-category">
          <Form.Control
            type="text"
            placeholder="Search budget"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
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
              />
            );
          })}
          <UncategorizedBudgetCard/>
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
    </div>
  );
};

export default BudgetsPage;
