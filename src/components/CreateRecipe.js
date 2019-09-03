import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosWithAuth.js';
import { TextArea, Form, Input } from 'semantic-ui-react';
import LoadingButton from './LoadingButton';

function CreateRecipe(props) {
    const [ recipeID, setRecipeID ] = useState(false);
    const [ isLoading, setLoading ] = useState(false);
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

    useEffect(() => {
        const id = props.match.params.id;
        if (id) {
            setRecipeID(id);
            props.recipesList.forEach((item) => {
                if (item.id.toString() === id ) {
                  setRecipeData(item)
                }
              }
            )
        }
      }, [props.match.params.id, props.recipesList])

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

    const createRecipe = () => {
        console.log("here we go")
        axiosWithAuth().post('https://secretfamilyrecipes.herokuapp.com/recipes', recipeData)
            .then(result => {
                setLoading(false);
                props.history.push(`/recipe/${result.data.pop().id}`);
                props.updateData(false);
              })
              .catch(err => {
                setLoading(false);
                  console.log(err);
              })
    }

    const updateRecipe = () => {
        axiosWithAuth().delete(`https://secretfamilyrecipes.herokuapp.com/recipes/${recipeID}`)
        .then((result) => {
            createRecipe();
        })
        .catch((err) => {
            console.log(err)
        })
}

    useEffect(() => {
            if (isLoading && recipeID) {
                updateRecipe();
            } else if (isLoading && !recipeID) {
                createRecipe();
            }
        }, [isLoading])

    const enter = (event, name) => {
        if (event.key === 'Enter' && event.target.type !== 'textarea' && event.target.type !== 'input' ) {
            event.preventDefault();
            if (name === 'tagsInput') {
                addTag();
            } else if (name === 'ingredientsInput') {
                addIngredient();
            }
        }
    }

    const handleClick = () => {
        setLoading(true);
    }

  return (
            <Form className="create_recipe" onSubmit={handleClick}>
                <Form.Field>
                    <Input size='massive' className="recipe_name" value={recipeData.title} name="title" placeholder='Recipe Title' onKeyDown={event => enter(event)} onChange={event => handleChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <Input size='large' className="recipe_source" value={recipeData.source} name="source" placeholder='Author/Source' onKeyDown={event => enter(event)} onChange={event => handleChange(event)}/>
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
                    <Input className="tags_create"  
                    placeholder='Add Tags' 
                    name="tagsInput"
                    type='text'
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
                    <Input className="ingredients_create" 
                    placeholder='Add Ingredient' 
                    name="ingredientsInput"
                    type="text"
                    value={currentIngredient}
                    action={{icon: 'plus', type: 'button', onClick: addIngredient, tabindex: "-1" }}
                    onChange={event => handleChange(event)}
                    onKeyDown={event => enter(event, "ingredientsInput")}
                    />
                </Form.Field>
                <label>
                    <h2>Directions</h2>
                </label>
                <Form.Field>
                    {
                        <TextArea className="directions_create" rows="10" name="directions" onChange={event => handleChange(event)} value={
                            !recipeData["instructions"] ? '' : recipeData["instructions"].join('\n')
                        }/>
                    }

                </Form.Field>
                {
                    !recipeID ? <LoadingButton isLoading={isLoading} handleClick={handleClick} loading={"Creating Recipe"} buttonName={"Create Recipe"}/> : <LoadingButton isLoading={isLoading} handleClick={handleClick} loading={"Updating Recipe"} buttonName={"Update Recipe"}/>
                }
        </Form>
  );
}

export default CreateRecipe;

