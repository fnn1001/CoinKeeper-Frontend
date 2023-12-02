// COMPONENTS
import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../context/BudgetsContext";

// DEPENDENCIES
import { currencyFormatter } from "../../utils";

// STYLES
import "./ViewExpensesModal.css"

const ViewExpensesModal = (props) => {
  const { budgetId, handleClose } = props;

  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId)

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(budget => budget.id === budgetId);

  console.log("test", budgetId, budgetId !== null)

  const showModal = !!budgetId

  return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div> Expenses - {budget?.name}</div>
              {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button
                  onClick={() => {
                    console.log("Deleting budget: ", budget)
                    deleteBudget({id: budget.id});
                    console.log("Budget deleted")
                    handleClose();
                  }}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              )}
            </Stack>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack direction="vertical" gap="3">
            {expenses.map(expense => (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4"> {expense.description} </div>
                <div className="fs-5">
                {currencyFormatter.format(expense.amount)} 
                </div>
                <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
          </Stack>
        </Modal.Body>
      </Modal>
  );
};

export default ViewExpensesModal;
