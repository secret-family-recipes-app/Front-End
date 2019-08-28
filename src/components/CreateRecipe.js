import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosWithAuth.js';
import { Button, TextArea, Form, Input } from 'semantic-ui-react'

function CreateRecipe(props) {
    const [ currentTag, setCurrentTag ] = useState('');
    const [ currentIngredient, setCurrentIngredient ] = useState('');
    const [ recipeData, setRecipeData ] = useState({
        "title": "",
        "source": "",
        "notes": "",
        "ingredients": [],
        "instructions": [],
        "tags": []
    });

    const handleChange = (event, index) => {
        if (event.target.name === "title" || event.target.name === "source" || event.target.name === "notes" ) {
            setRecipeData({ ...recipeData, [event.target.name]: event.target.value })
        } else if (event.target.name === "tagsInput"){
            setCurrentTag(event.target.value)
        } else if (event.target.name === "ingredientsInput"){
            setCurrentIngredient(event.target.value)
        } else if (event.target.name === "tags") {
            const newTagArr = [...recipeData["tags"]]
            newTagArr[index] = event.target.value
            setRecipeData({...recipeData, "tags": newTagArr})
        } else if (event.target.name === "ingredients") {
            const newIngredientsArr = [...recipeData["ingredients"]]
            newIngredientsArr[index] = event.target.value
            setRecipeData({...recipeData, "ingredients": newIngredientsArr})
        } else if (event.target.name === "directions") {
            setRecipeData({...recipeData, "instructions": event.target.value.split(/\n/)})
        }
    }

    const addTag = (event) => {
        setRecipeData({...recipeData, "tags": [...recipeData['tags'], currentTag]})
        setCurrentTag('')
    }

    const addIngredient = (event) => {
        setRecipeData({...recipeData, "ingredients": [...recipeData['ingredients'], currentIngredient]})
            setCurrentIngredient('')
    }

    const deleteTag = (event, index) => {
        event.preventDefault();
        const tagArr = [...recipeData["tags"]]
        tagArr.splice( index , 1)
        setRecipeData({...recipeData, "tags": tagArr})
    }

    const deleteIngredient = (event, index) => {
        event.preventDefault();
        const arr = [...recipeData["ingredients"]]
        arr.splice( index , 1)
        setRecipeData({...recipeData, "ingredients": arr})
    }

    console.log(recipeData)

    const createRecipe = event => {
        axiosWithAuth().post('https://secretfamilyrecipes.herokuapp.com/recipes', recipeData)
          .then(result => console.log(result))
          .catch(err => console.log(err));
    }

    const enter = (event, name) => {
        if (event.key === 'Enter' && event.target.type != 'textarea' && event.target.type != 'input' ) {
            event.preventDefault();
            if (name === 'tagsInput') {
                addTag();
            } else if (name === 'ingredientsInput') {
                addIngredient();
            }
        }
    }

  return (
    <Form onSubmit={createRecipe}>
        <Form.Field>
            <Input size='massive' name="title" placeholder='Recipe Title' onKeyDown={event => enter(event)} onChange={event => handleChange(event)}/>
        </Form.Field>
        <Form.Field>
            <Input size='large' name="source" placeholder='Author/Source' onKeyDown={event => enter(event)} onChange={event => handleChange(event)}/>
        </Form.Field>
        {
            recipeData["tags"] ? recipeData["tags"].map((tag, index) => {
                return (
                    <Form.Field>
                        <Input 
                        name="tags"
                        value={recipeData["tags"][index]} 
                        type='text' 
                        onChange={event => handleChange(event, index)} 
                        action={{icon: 'cancel', 
                        type: 'button', onClick:event => deleteTag(event, index)}}/>
                    </Form.Field>
                )
            }) : <div></div>
        }
        <Form.Field>
            <Input 
            placeholder='Add Tags' 
            name="tagsInput"
            type='text'
            // onSubmit={enter}
            value={currentTag}
            action={{icon: 'plus', type: 'button', onClick: addTag, tabindex: "-1" }}
            onChange={event => handleChange(event)}
            onKeyDown={event => enter(event, "tagsInput")}
            />
        </Form.Field>
        <label>
            <h2>Ingredients</h2>
        </label>
        {
            recipeData["ingredients"] ? recipeData["ingredients"].map((ingredient, index) => {
                return (
                    <Form.Field>
                        <Input 
                        name="ingredients"
                        value={recipeData["ingredients"][index]} 
                        type='text' 
                        onChange={event => handleChange(event, index)} 
                        action={{icon: 'cancel', 
                        type: 'button', onClick:event => deleteIngredient(event, index)}}/>
                    </Form.Field>
                )
            }) : <div></div>
        }
        <Form.Field>
            <Input 
            placeholder='Add Ingredient' 
            name="ingredientsInput"
            type="text"
            value={currentIngredient}
            action={{icon: 'plus', type: 'button', onClick: addIngredient, tabindex: "-1" }}
            onChange={event => handleChange(event)}
            onKeyDown={event => enter(event, "ingredientsInput")}
            // onSubmit={enter}
            />
        </Form.Field>
        <label>
            <h2>Directions</h2>
        </label>
        <Form.Field>
            <TextArea name="directions" onChange={event => handleChange(event)}/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
  </Form>
  );
}

export default CreateRecipe;