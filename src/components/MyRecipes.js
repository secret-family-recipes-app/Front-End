import React from 'react';
import { Card } from 'semantic-ui-react';
import RecipeCard from './RecipeCard';
import { Link } from "react-router-dom";

function MyRecipes(props) {

  return (
      <Card.Group>
      {
          props.filteredData.map((recipe) => {
              return <Link to={`recipe/${recipe.id}`}>
                  <RecipeCard recipe={recipe}/>
                  </Link>
          })
      }
      </Card.Group>
  );
}

export default MyRecipes;