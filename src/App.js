import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import LogIn from "./components/LogIn";
import { Menu } from 'semantic-ui-react'

function App() {
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: false
  });

const userHasAuthenticated = authenticated => {
  setUserAuth({ isAuthenticated: authenticated })
}

const handleLogout = event => {
  userHasAuthenticated(false);
}

console.log(userAuth);

  return (
    <div className="App">
      {userAuth.isAuthenticated 
      ? <Menu secondary>
      <Menu.Item
            name='logout'
            position="right"
            // active={activeItem === 'logout'}
            onClick={handleLogout}
          />
      </Menu>
      : <Menu secondary>
      </Menu>
      }
      <LogIn userHasAuthenticated={userHasAuthenticated}/>
    </div>
  );
}

export default App;