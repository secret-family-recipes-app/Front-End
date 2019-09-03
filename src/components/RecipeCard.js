import React from 'react';
import { Card, Image, Label, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function RecipeCard(props) {

  return (
    <Card>
    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped ui={false} />
    <Card.Content>
        <Card.Header>{props.recipe.title}</Card.Header>
        <Card.Description>
            {
                props.recipe.tags.map((tag) => {
                    return <Label image><Icon name='hashtag' />{tag}</Label>
                })
            }
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Link to={`/recipe/${props.recipe.id}/edit`}>
        <Icon name='edit' /> Edit
        </Link>
    </Card.Content>
    </Card>
  )
}

export default RecipeCard;

