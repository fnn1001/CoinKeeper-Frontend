// DEPENDENCIES
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";

const AddBudgetModal = (props) => {
  const { isShow, handleClose, onAddBudget } = props;

  const nameRef = useRef();
  const maxRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });

    handleClose();
  };

  return (
    <div>
      <Modal show={isShow} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title> New Budget </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label> Name </Form.Label>
              <Form.Control ref={nameRef} type="text" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="max">
              <Form.Label> Maximum spending </Form.Label>
              <Form.Control
                ref={maxRef}
                type="number"
                required
                min={0}
                step={0.01}
              />
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

export default AddBudgetModal;
