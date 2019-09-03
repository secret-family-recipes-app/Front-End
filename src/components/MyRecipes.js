import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import RecipeCard from './RecipeCard';
import { Link } from "react-router-dom";

function MyRecipes(props) {

  return (
      <Card.Group>
      {
          !props.searchState 
          ? <Link to="/create">
          <Card className="create">
              <Card.Content>
                  <Icon name="plus"></Icon>
                  <p>Add Recipe</p>
              </Card.Content>
          </Card>
      </Link> : <div></div>
      }
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

