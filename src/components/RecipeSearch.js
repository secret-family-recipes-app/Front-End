import React from 'react';
import { Input } from 'semantic-ui-react'

function RecipeSearch(props) {

  return (
      <div className="ui input"><Input type="text" icon='search' placeholder="Search..." autoComplete="off" onChange={props.onChange}/></div>
  );
}

export default RecipeSearch;