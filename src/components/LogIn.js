import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

function LogIn(props) {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        setUserData({...userData, 
          [event.target.name]: event.target.value
        });
      }

    const handleSubmit = event => {
        event.preventDefault();
        props.login(userData);
        }

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' name="username" value={userData.username} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" name="password" value={userData.password} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>Log In</Button>
        </Form>
    </div>
  );
}

export default LogIn;