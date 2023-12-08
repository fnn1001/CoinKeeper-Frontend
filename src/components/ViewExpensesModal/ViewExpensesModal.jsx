// COMPONENTS
import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID } from "../../context/BudgetsContext";

// DEPENDENCIES
import { currencyFormatter } from "../../utils";

// STYLES
import "./ViewExpensesModal.css";

const ViewExpensesModal = (props) => {
  const { isShow, budget, budgetId, onClose, onDeleteBudget, onDeleteExpense } = props;
  const { _id, name, expenses } = budget || {};

  const handleDeleteBudgetClick = (e) => {
    e.stopPropagation();

    console.log("Deleting budget: ", budget);
    onDeleteBudget(_id);

    onClose();
  };

  const handleDeleteExpenseClick = (e, expense) => {
    e.stopPropagation();

    console.log("Deleting budget: ", expense);
    onDeleteExpense(expense._id);
  };

  const showModal = !!budget && isShow;

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton={true}>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div> Expenses - {name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={handleDeleteBudgetClick}
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
          {expenses?.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4"> {expense.name} </div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={(e) => handleDeleteExpenseClick(e, expense)}
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
