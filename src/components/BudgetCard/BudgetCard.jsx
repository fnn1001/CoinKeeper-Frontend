// INTERNAL DEPENDENCIES
import { currencyFormatter } from "../../utils";

// EXTERNAL DEPENDENCIES
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";

// STYLES
import "./BudgetCard.css";

const BudgetCard = (props) => {
  const { name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick } = props
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
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
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button
            variant="outline-primary"
            className="add-btn"
            onClick={onAddExpenseClick}
          > 
            Add Expense
          </Button>
          <Button variant="outline-secondary" className="add-btn" onClick={onViewExpensesClick}>          
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
}

export default BudgetCard;
