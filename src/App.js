import React, { useState, useEffect, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import { Menu } from 'semantic-ui-react';
import { Route, NavLink, withRouter, Link } from "react-router-dom";

function App(props) {
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: localStorage.getItem('authenticated')
  });

  const userHasAuthenticated = authenticated => {
    setUserAuth({ isAuthenticated: authenticated })
  }

  useEffect(() => {
    localStorage.setItem('authenticated', userAuth.isAuthenticated);
  }, [userAuth]);

const handleLogout = event => {
  userHasAuthenticated("false");
  props.history.push("/login");
}

  return (
    <div className="App">
      {console.log(`Local storage ${localStorage.getItem('authenticated')}, userAuth: ${userAuth.isAuthenticated}`)}
      <Menu secondary>
        {
        userAuth.isAuthenticated === "true"
        ? <Menu.Item name='logout' position="right" onClick={handleLogout} />
        : <Fragment>
            <Menu.Item name="login" position="right">
              <NavLink to="/login">Log In</NavLink>
            </Menu.Item>
            <Menu.Item name="sign up"/> 
          </Fragment>
        }
      </Menu>
        <Route path="/login" exact render={props => <LogIn {...props} userHasAuthenticated={userHasAuthenticated} userAuth={userAuth}/>} />
        <Route path="/dashboard" render={props => <Dashboard {...props} />} />
    </div>
  );
}

export default withRouter(App);