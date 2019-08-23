import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

function Signup(props) {
    const [signupData, setSignupData] = useState({
        // firstname: "",
        // lastname: "",
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
        {/* <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' name="firstname" value={signupData.firstname} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' name="lastname" value={signupData.lastname} onChange={handleChange}/>
            </Form.Field> */}
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