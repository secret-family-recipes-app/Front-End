import React, { Fragment } from 'react';
import logo from '../logo.svg';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

function Nav(props) {

  return (
          <div className="menu">
            <div>
              <a href="https://secret-family-recipes-app.github.io/Marketing-Page/">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
            </div>
          {
              localStorage.getItem('token')
              ? <Fragment>
                  <Menu.Item name='recipes' >
                    <NavLink to="/myrecipes">My Recipes</NavLink>
                </Menu.Item>
                <Menu.Item position="right"></Menu.Item>
                  <Dropdown item icon='user' simple>
                    <Dropdown.Menu>
                    <Dropdown.Item>Share</Dropdown.Item>
                    <Dropdown.Item name='logout' onClick={props.handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Fragment>
              : <div>
                  <a href="https://secret-family-recipes-app.github.io/Marketing-Page/about.html" className="pages about-link">About Us</a>
                  <NavLink to="/signup" activeClassName="active" className="pages">Sign Up</NavLink>
                </div>
          }
          </div>
  );
}

export default Nav;