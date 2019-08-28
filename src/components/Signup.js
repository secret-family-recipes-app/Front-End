import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

function Signup(props) {
    const [signupData, setSignupData] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        setSignupData({...signupData, 
          [event.target.name]: event.target.value
        });
      }

    const handleSubmit = event => {
        event.preventDefault();
        props.signup(signupData);
        }

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' name="username" value={signupData.username} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" name="password" value={signupData.password} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>Sign Up</Button>
        </Form>
    </div>
  );
}

export default Signup;