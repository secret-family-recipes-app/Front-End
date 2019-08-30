import React, { Fragment } from 'react';
import logo from '../logo.svg';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

function Nav(props) {

  return (
          <Menu secondary>
            <div>
            <NavLink to="/index.html">
            <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
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
              : <Menu.Item position='right'>
                  <NavLink to="/signup" activeClassName="active" >Sign Up</NavLink>
                </Menu.Item>
          }
          </Menu>
  );
}

export default Nav;