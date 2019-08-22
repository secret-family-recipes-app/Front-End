import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

// test login data

const loginData = [
    {
        "username": "sofia",
        "password": "12345"
    }
]

function LogIn() {
    const [userData, setUserData] = useState({
        "username": "",
        "password": ""
    });

    const handleChange = event => {
        setUserData({...userData, 
          [event.target.name]: event.target.value
        });
      }

      console.log(userData);

  return (
    <div>
        <Form>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' name="username" value={userData.username} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' name="password" value={userData.password} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>Log In</Button>
        </Form>
    </div>
  );
}

export default LogIn;