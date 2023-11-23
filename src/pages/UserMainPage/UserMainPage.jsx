// STYLES
import "../UserMainPage/UserMainPage.css"

// COMPONENTS
import AddCategory from "../../components/AddCategory/AddCategory"
import AddExpense from "../../components/AddExpense/AddExpense"
import AddIncome from "../../components/AddIncome/AddIncome"
import BudgetCard from "../../components/BudgetCard/BudgetCard"

// EXTERNAL DEPENDENCIES
import React from "react"

const UserMainPage = () => {
    return (
        <div className="main-page-wrapper">

            <div className="cards-wrapper">
                <BudgetCard name="Entertainment" amount={600} max={1000}> </BudgetCard>
            </div>
  

            <div className="cards-wrapper">
            <AddExpense/>
            </div>   


            <div className="cards-wrapper">
            <AddIncome/>
            </div>   

            <div className="cards-wrapper">
            <AddCategory/>
            </div>  



        </div>
    )
}

export default UserMainPage