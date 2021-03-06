import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Link } from "react-router-dom";

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
    <div className="signup authform">
      <h2>Start Creating and Sharing Recipes!</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Email Address</label>
                <input name="username" value={signupData.username} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" name="password" value={signupData.password} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>Sign Up</Button>
        </Form>
        <p>Already have an account??</p>
        <Button>
          <Link to="/login">Log In</Link>
        </Button>
    </div>
  );
}

export default Signup;