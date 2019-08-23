import React, { useState, useEffect, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import { Menu } from 'semantic-ui-react';
import { Route, NavLink, withRouter, Link } from "react-router-dom";
import axios from 'axios';

function App(props) {
  const [userAuth, setUserAuth] = useState({
    userToken: localStorage.getItem('token')
  });

  // const userHasAuthenticated = token => {
  //   setUserAuth({ userToken: token })
  // }

  const login = (userData) => {
    axios.post('https://secretfamilyrecipes.herokuapp.com/auth/login', userData)
          .then(res => {
            setUserAuth({ userToken: res.data.token })
            localStorage.setItem('token', res.data.token);
            props.history.push("/dashboard");
          })
          .catch(err => {
              console.log(err);
          })
  }

  const signup = (userData) => {
    axios.post('https://secretfamilyrecipes.herokuapp.com/auth/register', userData)
          .then(res => {
            setUserAuth({ userToken: res.data.token })
            localStorage.setItem('token', res.data.token);
            props.history.push("/dashboard");
          })
          .catch(err => {
              console.log(err);
          })
  }

  useEffect(() => {
    localStorage.setItem('token', userAuth.userToken);
  }, [userAuth]);

const handleLogout = event => {
  setUserAuth({ userToken: "" })
  props.history.push("/login");
}

  return (
    <div className="App">
      {console.log(`Local storage ${localStorage.getItem('authenticated')}, userAuth: ${userAuth.isAuthenticated}`)}
      <Menu secondary>
        {
        userAuth.userToken !== ""
        ? <Menu.Item name='logout' position="right" onClick={handleLogout} />
        : <Fragment>
            <Menu.Item name="login" position="right">
              <NavLink to="/login" activeClassName="active">Log In</NavLink>
            </Menu.Item>
          <Menu.Item>
            <NavLink to="/signup" activeClassName="active">Sign In</NavLink>
          </Menu.Item>
          </Fragment>
        }
      </Menu>
        <Route path="/login" exact render={props => <LogIn {...props} login={login} userAuth={userAuth}/>} />
        <Route path="/signup" exact render={props => <Signup {...props} signup={signup} />} />
        <Route path="/dashboard" render={props => <Dashboard {...props} />} />
    </div>
  );
}

export default withRouter(App);