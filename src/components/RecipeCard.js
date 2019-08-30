import React from 'react';
import { Card, Image, Label, Icon } from 'semantic-ui-react';

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
        <a>
        <Icon name='edit' />
        Edit Recipe
        </a>
    </Card.Content>
    </Card>
  )
}

export default RecipeCard;

