// DEPENDENCIES
import { currencyFormatter } from "../../utils";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";

// STYLES
import "./BudgetCard.css";

const BudgetCard = (props) => {
  const {
    name,
    amount,
    max,
    hideButtons,
    onAddExpenseClick,
    onViewExpensesClick,
  } = props;

  const classNames = [];

  return (
    <Card className={classNames.join(" ")}>
      {amount > max && (
        <div className="warning-message">
          <span role="img" aria-label="warning">
            ⚠️
          </span>
          Warning: You are over budget!
        </div>
      )}

{amount >= max / 2 && amount <= max && (
  <div className="warning-message">
    Slow down, you're halfway through your budget. 
  </div>
)}
      <Card.Body>
        <Card.Title className="card-title">
          <div className="card-name"> {name} </div>
          <div className="card-amounts">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="max-amount">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
       {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4 d-flex justify-content-center gap-2">
            <Button
              variant="outline-primary"
              className="add-btn"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-secondary"
              className="add-btn"
              onClick={onViewExpensesClick}
            >
              View Expenses
            </Button>
          </Stack>
       )}
      </Card.Body>
    </Card>
  );
};

const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};

export default BudgetCard;
