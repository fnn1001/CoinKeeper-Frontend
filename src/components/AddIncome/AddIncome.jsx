// EXTERNAL DEPENDENCIES
import React, { useState } from "react";

// STYLES
import "./AddIncome.css"; 

const AddIncome = () => {
  const [incomeData, setIncomeData] = useState({
    amount: "",
    categoryID: "", // should we set a default category ID for income??
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Income data submitted:", incomeData);

    // Clear form after submission
    setIncomeData({
      amount: "",
      categoryID: "",
      date: "",
    });
  };

  return (
    <div className="add-income-container">
      <form onSubmit={handleSubmit}>

        {/* Amount */}
        <div className="income-input-wrapper"> 
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={incomeData.amount}
          onChange={handleInputChange}
          required
        />
        </div>

        {/* Date */}
        <div className="income-input-wrapper"> 
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={incomeData.date}
          onChange={handleInputChange}
          required
        />
        </div>

        {/* Submit button */}
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default AddIncome;
