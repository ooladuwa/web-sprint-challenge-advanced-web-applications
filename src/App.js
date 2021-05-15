import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "../src/components/PrivateRoute";
import BubblePage from "../src/components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const logout = () => {
    window.localStorage.removeItem("token");
  };
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/" onClick={logout}>
            logout
          </a>
        </header>
        <PrivateRoute
          exact
          path="/protected/bubblePage"
          component={BubblePage}
        />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.
