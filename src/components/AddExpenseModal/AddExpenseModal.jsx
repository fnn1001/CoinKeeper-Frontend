// DEPENDENCIES
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";

// CONTEXT
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "../../context/BudgetsContext";

const AddExpenseModal = (props) => {
  const { budget, isShow, handleClose, onAddExpense } = props;

  const nameRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { budgets } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddExpense({
      name: nameRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });

    handleClose();
  };
  
  return (
    <div>
      <Modal show={isShow} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title> New Expense </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label> Description </Form.Label>
              <Form.Control ref={nameRef} type="text" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label> Amount </Form.Label>
              <Form.Control
                ref={amountRef}
                type="number"
                required
                min={0}
                step={0.01}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="budgetId">
              <Form.Label> Budget </Form.Label>
              <Form.Select defaultValue={budget?._id || UNCATEGORIZED_BUDGET_ID} ref={budgetIdRef}>
                <option id={UNCATEGORIZED_BUDGET_ID}> Uncategorized </option>
                {budgets.map((budget, index) => (
                  <option key={index} value={budget._id}>
                    {budget.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" className="add-button">
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </div>
  );
};

export default AddExpenseModal;
