import React, { useState, useEffect }from 'react';
import 'semantic-ui-css/semantic.min.css';
import LogIn from "./components/LogIn";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import CreateRecipe from "./components/CreateRecipe";
import { Route, withRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import { axiosWithAuth } from './axiosWithAuth.js';

function App(props) {
  const [ recipesList, setRecipesList ] = useState([])
  const [ updatedData, setUpdatedData ] = useState(false)

  useEffect(() => {
    axiosWithAuth().get('https://secretfamilyrecipes.herokuapp.com/recipes')
    .then(res => {
      setRecipesList(res.data.recipes)
      setUpdatedData(true)
    })
    .catch(err => {
      console.log(err);
    })
  }, updatedData)

  console.log(recipesList)

  const updateData = () => {
    setUpdatedData(false);
  }
  
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
        ? <Component {...props} {...rest}/>
        : <Redirect to='/login' />
    )} />
    )

  return (
    <div className="App">
      <Nav handleLogout={handleLogout}/>
      <PrivateRoute path='/dashboard' component={Dashboard} recipesList={recipesList}/>
      <PrivateRoute path='/create' component={CreateRecipe} updateData={updateData}/>
      <Route path="/login" exact render={props => <LogIn {...props} login={login}/>} />
      <Route path="/signup" exact render={props => <Signup {...props} signup={signup} />} />
      <p class="copyright">Terms of Service | Private Policy | Copyright SFA 2019</p>
    </div>
  );
}

export default withRouter(App);