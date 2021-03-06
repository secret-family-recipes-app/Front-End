import React, { useState, useEffect }from 'react';
import 'semantic-ui-css/semantic.min.css';
import LogIn from "./components/LogIn";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import CreateRecipe from "./components/CreateRecipe";
import RecipeView from "./components/RecipeView";
import { Route, withRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import { axiosWithAuth } from './axiosWithAuth.js';

function App(props) {
  const [ recipesList, setRecipesList ] = useState([])
  const [ isDataUpdated, setIsDataUpdated ] = useState(true)

  useEffect(() => {
    console.log('updating')
    axiosWithAuth().get('https://secretfamilyrecipes.herokuapp.com/recipes')
    .then(res => {
      setRecipesList(res.data.recipes);
      setIsDataUpdated(true);
      console.log('test');
    })
    .catch(err => {
      console.log(err);
    })
  }, [isDataUpdated])

  console.log(recipesList);

  const updateData = (bool) => {
    setIsDataUpdated(bool);
  }
  
  const axiosAuth = (authType, userData) => {
    axios.post(`https://secretfamilyrecipes.herokuapp.com/auth/${authType}`, userData)
          .then(res => {
            localStorage.setItem('token', res.data.token);
            props.history.push("/myrecipes");
            setIsDataUpdated(false);
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
    setRecipesList([]);
    props.history.push("/login");
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("token")
        ? <Component {...props} {...rest}/>
        : <Redirect to='/login' />
    )} />
    )

    console.log(isDataUpdated);

  return (
    <div className="App">
      <Nav handleLogout={handleLogout}/>
      <PrivateRoute path='/myrecipes' component={Dashboard} recipesList={recipesList} isDataUpdated={isDataUpdated}/>
      <PrivateRoute path='/create' component={CreateRecipe} updateData={updateData} recipesList={recipesList}/>
      <PrivateRoute path='/recipe/:id' exact component={RecipeView} updateData={updateData} recipesList={recipesList} />
      <PrivateRoute path='/recipe/:id/edit' component={CreateRecipe} updateData={updateData} recipesList={recipesList} />
      <PrivateRoute path='/' exact component={Dashboard} recipesList={recipesList} />
      <Route path="/login" exact render={props => (localStorage.getItem("token") ? <Redirect to='/myrecipes' /> : <LogIn {...props} login={login} />)} />
      <Route path="/signup" exact render={props => (localStorage.getItem("token") ? <Redirect to='/myrecipes' /> : <Signup {...props} signup={signup} />)} />
      <Route path="/recipe/:id/public"render={props => <RecipeView {...props} recipesList={recipesList} />} />
      <footer>
      <p>
        <a href="#">Terms of Service</a> | <a href="#">Private Policy</a> |
        <a href="#"> Copyright SFA 2019</a>
      </p>
    </footer>
    </div>
  );
}

export default withRouter(App);
