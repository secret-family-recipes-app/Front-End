import React, { useState, useEffect } from 'react';
import RecipeSearch from './RecipeSearch';
import { Card } from 'semantic-ui-react';

function Dashboard() {
    const [ searchState, setSearchState ] = useState('')
    const [ data, setData ] = useState(
        [
            {
                "recipe": "Shepherd's Pie",
                "author": "Alton Brown"
            },
            {
                "recipe": "Turkish Eggs",
                "author": "Nigella Lawson"
            },
            {
                "recipe": "Roast Chicken",
                "author": "Ina Garten"
            },
            {
                "recipe": "Ratatouille",
                "author": "Ina Garten"
            }
        ]
    )
    const [ filteredData, setFilteredData ] = useState(data);

    const handleChange = event => {
        setSearchState(event.target.value)
      }

      useEffect(() => {
        if (searchState.length > 0) {
            setFilteredData(data.filter((recipe) => Object.keys(recipe).some(key => (recipe[key].toLowerCase().includes(searchState.toLowerCase())))
            ))
        } else {
            setFilteredData(data)
        }
      }, [searchState, data])

  return (
    <div>
        <h1>Dashboard</h1>
        <RecipeSearch onChange={handleChange}/>
        <Card.Group>
        {
            filteredData.map((recipe) => {
                return <Card>
                <Card.Content>
                  <Card.Header>{recipe.recipe}</Card.Header>
                  <Card.Meta>{recipe.author}</Card.Meta>
                </Card.Content>
              </Card>
            })
        }
        </Card.Group>
    </div>
  );
}

export default Dashboard;


