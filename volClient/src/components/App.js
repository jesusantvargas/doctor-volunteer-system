import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Patient from './Patient';
import Doctor from './Doctor';
import Login from './Login';
import {
  Redirect,
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

class App extends Component {

  render() {
    let appHeader;

    appHeader = (
      <header className="App-header">
        <div className="App-menu">
        </div>
      </header>
    );

    return (
      
      //Declares which component is rendered when a user enters a specific route

      <Router>
        <div className="App">
          {appHeader}
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/doc' component={Doctor} />
          <Route path='/patient' component={Patient} />
        </div>
      </Router>
    );
  }
}

export default App; 