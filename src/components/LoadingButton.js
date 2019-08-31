import React from 'react';
import { Button } from 'semantic-ui-react';

function LoadingButton (props) {

    return (
    <Button type='submit'
        disabled={props.isLoading}
        onClick={!props.isLoading ? props.handleClick : null}
      >
        {props.isLoading ? props.loading : props.buttonName}
      </Button>
    )
}

export default LoadingButton
