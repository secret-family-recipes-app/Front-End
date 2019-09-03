import React, { useState, useEffect } from 'react';
import RecipeSearch from './RecipeSearch';
import MyRecipes from './MyRecipes';
import { Link } from "react-router-dom";

// ("title", "source", "notes", "ingredients", "instructions", "tags")

function Dashboard(props) {
    const [ searchState, setSearchState ] = useState('');
    const [ filteredData, setFilteredData ] = useState(props.recipesList);

    console.log(filteredData)
    console.log(props.recipesList)

    const handleChange = event => {
        setSearchState(event.target.value)
      }

      useEffect(() => {
        if (searchState.length > 0) {
            setFilteredData(props.recipesList.filter((recipe) => Object.keys(recipe).filter((key) => key !== "id" && key !== "user_id")
                .some(key => recipe[key].toString('').toLowerCase().includes(searchState.toLowerCase()))
            ))
        } else {
            setFilteredData(props.recipesList)
        }
      }, [searchState, props.recipesList])

  return (
    <div className="my_recipes">
      <div className="recipes_header">
        <h1>My Recipes</h1>
        <RecipeSearch onChange={handleChange}/>
      </div>
        <MyRecipes searchState={searchState} filteredData={filteredData}/>
    </div>
  );
}

export default Dashboard;


// "title": props.recipesList.title,
// "source": props.recipesList.source,
// "notes": props.recipesList.notes,
// "tags": props.recipesList.tags,



