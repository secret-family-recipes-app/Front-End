import React, { Fragment } from 'react';
import logo from '../logo.svg';
import { Menu, Dropdown, Modal, Header } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

function Nav(props) {

  const handleClick = () => {

  }

  return (
          <Menu secondary>
            <img src={logo} className="App-logo" alt="logo" />
          {
              localStorage.getItem('token')
              ? <Fragment>
                  <Menu.Item name='recipes' >
                    <NavLink to="/myrecipes">My Recipes</NavLink>
                </Menu.Item>
                <Menu.Item position="right"></Menu.Item>
                  <Dropdown item icon='user' simple>
                    <Dropdown.Menu>
                    <Modal trigger={<Dropdown.Item>Share</Dropdown.Item>} closeIcon>
                      <Header icon='share' content='Share Link' />
                      <Modal.Content>
                        <p>
                          Copied [ublic link to clipboard]
                        </p>
                      </Modal.Content>
                      </Modal>
                    <Dropdown.Item name='logout' onClick={props.handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Fragment>
              : <Menu.Item position='right'>
                  <NavLink to="/signup" activeClassName="active" className="signup">Sign Up</NavLink>
                </Menu.Item>
          }
          </Menu>
  );
}

export default Nav;


