import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Link } from "react-router-dom";

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
    <div className="login authform">
      <h2>Welcome Back!</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Email Address</label>
                <input name="username" value={userData.username} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>LOG IN</Button>
            <p>FORGOT YOUR PASSWORD?</p>
        </Form>
        <p>Don't have an account?</p>
        <Button>
          <Link to="/signup">SIGN UP</Link>
        </Button>
    </div>
  );
}

export default LogIn;