import React, { Fragment } from 'react';
import logo from '../logo.svg';
import { Menu } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

function Nav(props) {

  return (
          <Menu secondary>
            <img src={logo} className="App-logo" alt="logo" />
          {
              localStorage.getItem('token')
              ? <Menu.Item name='logout' position="right" onClick={props.handleLogout} />
              : <Menu.Item position='right'>
                  <NavLink to="/signup" activeClassName="active" className="signup">Sign Up</NavLink>
                </Menu.Item>
          }
          </Menu>
  );
}

export default Nav;