import React, { useEffect, useState } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { axiosWithAuth } from '../axiosWithAuth.js';
import { Link } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function RecipeView (props) {
  const [ recipeID, setRecipeID ] = useState();
  const [ recipe, setRecipe ] = useState({
    title: "",
    source: "", 
    notes: "",
    ingredients: [],
    instructions: [],
    tags: []
  });

  useEffect(() => {
    const id = props.match.params.id;
    setRecipeID(id);
    props.recipesList.forEach((item) => {
      if (item.id.toString() === id ) {
        setRecipe(item)
      }
    }
    )
  }, [props.match.params.id, props.recipesList])

 const deleteRecipe = () => {
  axiosWithAuth().delete(`https://secretfamilyrecipes.herokuapp.com/recipes/${recipeID}`)
  .then((result) => {
    props.history.push(`/myrecipes`);
    props.updateData(false);
    console.log(result)
    }
  )

  .catch((err) => {
    console.log(err)
  })
 }

  console.log(recipe)

    return (
      <div>
        <section>
        <h1>{recipe.title}</h1>
        <p>{recipe.source}</p>
        {
          
        }
      {
        recipe.tags.map(tag => {
          return <p>tag</p>
        })
      }
      <Button onClick={deleteRecipe}><Icon name='trash' /> Delete Recipe</Button>
      <Button><Link to={`/recipe/${recipeID}/edit`}><Icon name='edit' /> Edit Recipe</Link></Button>
      <Popup
      on='click' content='Copied public link to clipbboard' trigger={<CopyToClipboard text={`https://secretfamilyrecipes.herokuapp.com/recipes/${recipeID}/public`}>
      <Button><Icon name='share' /> Share Recipe</Button>
      </CopyToClipboard>} />
      </section>
      {
        recipe.ingredients.map(ingredient => {
          return <p>{ingredient}</p>
        })
      }
      <section className="directions">
      {
        recipe.instructions.map(instruction => {
          if (instruction !== "") {
            return <p>{instruction}</p>
          } else {
            return <br/>
          }
        })
      }
      </section>
      </div>
    )
}

export default RecipeView