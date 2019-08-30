import React from 'react';
import { Card } from 'semantic-ui-react';
import RecipeCard from './RecipeCard';

function MyRecipes(props) {

  return (
      <Card.Group>
      {
          props.filteredData.map((recipe) => {
              return <RecipeCard recipe={recipe}/>
          })
      }
      </Card.Group>
  );
}

export default MyRecipes;