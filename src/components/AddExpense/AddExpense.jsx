// EXTERNAL DEPENDENCIES
import React, { useState } from "react";

// STYLES
import "./AddExpense.css"

const AddExpense = () => {
    const [expenseData, setExpenseData] = useState({
        amount: "",
        categoryID: "",
        date: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target 
        setExpenseData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Expense data submitted:", expenseData)
        
        // Clear form after submission
        setExpenseData({
            amount: "",
            categoryID: "",
            date: ""
        })
    }


  return (
    <div className="add-expense-container">
      <form onSubmit={handleSubmit}>

        {/* Amount */}
        <div className="expense-input-wrapper"> 
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expenseData.amount}
          onChange={handleInputChange}
          required
        />
        </div>

        {/* Category */}
        <div className="expense-input-wrapper"> 
          <label htmlFor="categoryID">Category:</label>
          <select
            id="categoryID"
            name="categoryID"
            value={expenseData.categoryID}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Category
            </option>
            <option value="housing">Housing</option>
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="bills">Bills</option>
            <option value="leisure">Leisure</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health & Wellness</option>
            <option value="childcare">Childcare</option>
            <option value="pets">Pets</option>
            <option value="education">Education</option>
            <option value="savings">Savings & Investments</option>











            {/* Add more options as needed */}
          </select>
        </div>

        {/* Date */}
        <div className="expense-input-wrapper"> 
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={expenseData.date}
          onChange={handleInputChange}
          required
        />
        </div>

        {/* Submit button */}
        <button className="add-btn" type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
