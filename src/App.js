import React, { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import { Menu } from 'semantic-ui-react';
import { Route, NavLink, withRouter, Redirect } from "react-router-dom";
import axios from 'axios';

function App(props) {

  const axiosAuth = (authType, userData) => {
    axios.post(`https://secretfamilyrecipes.herokuapp.com/auth/${authType}`, userData)
          .then(res => {
            localStorage.setItem('token', res.data.token);
            props.history.push("/dashboard");
          })
          .catch(err => {
              console.log(err);
          })
        }

  const login = (userData) => {
    axiosAuth("login", userData);
  }

  const signup = (userData) => {
    axiosAuth("register", userData);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.history.push("/login");
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("token")
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
    )

  return (
    <div className="App">
      <Menu secondary>
        {
        localStorage.getItem('token')
        ? <Menu.Item name='logout' position="right" onClick={handleLogout} />
        : <Fragment>
            <Menu.Item name="login" position="right">
              <NavLink to="/login" activeClassName="active">Log In</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
            </Menu.Item>
          </Fragment>
        }
      </Menu>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path="/login" exact render={props => <LogIn {...props} login={login}/>} />
        <Route path="/signup" exact render={props => <Signup {...props} signup={signup} />} />
    </div>
  );
}

export default withRouter(App);