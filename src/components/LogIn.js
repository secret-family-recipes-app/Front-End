import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

// test login data

const loginData = [
    {
        username: "sofia",
        password: "12345"
    }
]

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
        const currentUser = loginData.filter(user => (user.username === userData.username))
            if (currentUser.length < 1) {
                console.log("User does not exist.");
            } else if (currentUser.length === 1 && currentUser[0].password !== userData.password) {
                console.log("Wrong password");
            } else {
                console.log("Success!");
                props.userHasAuthenticated(true);
            }
        }

console.log(userData);

  return (
    <div>
        <Form onSubmit={handleSubmit}>
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