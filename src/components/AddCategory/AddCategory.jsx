// EXTERNAL DEPENDENCIES
import React, { useState } from "react"
import axios from "axios"

// STYLES
import './AddCategory.css'

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
  
    const handleCategorySubmit = async (e) => {
      e.preventDefault();
  
      const newCategory = {
        name: categoryName,
      };
  
      try {
        const response = await axios.post('http://localhost:5005/api/categories', newCategory);
        console.log('New category created:', response.data);
  
  
        setCategoryName('');
      } catch (error) {
        console.error('Error creating category:', error.message);
      }
    };

    return (
        <div className="add-category-container">
            <form onSubmit={handleCategorySubmit}>
                <label>
                Category Name:
                <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                />
                </label>
                <button className="add-btn" type="submit"> Add Category </button>
            </form>
        </div>
    )
}

export default AddCategory