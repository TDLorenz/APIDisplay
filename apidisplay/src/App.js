import React, { Component, useState } from 'react';
import './App.css';
import Number from './components/val';
import Newton from './components/newton';
import Weather from './components/weather';
import Saj from './components/saj';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />

          <Route exact path='/' component={Newton} />
          <Route exact path='/Number' component={Number} />
          <Route exact path='/Weather' component={Weather} />
          <Route exact path='/Saj' component={Saj} />

        </Router>
      </>
    );
  }
}
export default App
