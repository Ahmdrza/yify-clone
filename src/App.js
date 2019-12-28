import React from 'react';
import './App.css';
// import Main from './components/Main/Main';
import Main from './components/Main/index';
import Navbar from './components/Header/header';
import { Route, Switch } from "react-router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
