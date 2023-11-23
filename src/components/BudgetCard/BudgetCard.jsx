// INTERNAL DEPENDENCIES
import { currencyFormatter } from "../../utils"

// EXTERNAL DEPENDENCIES
import {Button, Card, ProgressBar, Stack } from "react-bootstrap"

// STYLES
import './BudgetCard.css'

const BudgetCard = ({name, amount, max}) => {
  return (
    <div className="card">
        <Card.Body>
            <Card.Title className="card-title"> 
            <p className="card-name"> {name} </p>
                <p className="card-amounts"> {currencyFormatter.format(amount)} / <span className="max-amount"> {currencyFormatter.format(max)} </span></p>
                </Card.Title>
            <ProgressBar className="rounded-pill" 
            variant={getProgressVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
            />

            <Stack direction="horizontal" gap="2" className="mt-4">
            <Button className="add-btn"> Add Expense </Button>
            <Button className="add-btn"> View Expenses </Button>


            </Stack>
            
         </Card.Body>    
         
    </div>
  )
}

function getProgressVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}

export default BudgetCard