import React, { Component } from 'react';
import '../css/App.css';
import ProfileBody from './ProfileBody';
import SignUp from './SignUp';
import { Form, FormControl, FormGroup, InputGroup, ButtonToolbar, Button, Modal, ControlLabel, Col } from 'react-bootstrap';
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: [],
    }

    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.login = this.login.bind(this);
  }

  // Handle form changes

  emailChange (e) {
    this.setState({
      email: e.target.value
    })
    console.log(this.state.email);
  }

  passwordChange (e) {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password);
  }

  // Makes a POST request containing user login information and returns all of the users info

  login (e) {
    let data = {
      email: this.state.email,
      password: this.state.password,
    }
    return fetch(`http://localhost:8080/api/v1/login.php`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      this.setState({user: data});
      console.log('Users', this.state.user);
      if (this.state.user.length > 0 && this.state.user[0].user_role === 'patient') {
        window.location = '/patient'
      } else if (this.state.user.length > 0 && this.state.user[0].user_role === 'doctor'){
        window.location = '/doc'
      } else {
        null
      }
    })
  }

  // After User info has been loaded, save to localStorage

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('User', JSON.stringify(nextState.user))
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-2"> 
          </div>
          <div className="col-lg-8"> 
            <div className="login-container">
              <div className="email-box">
                <form>
                  <FormGroup>
                    <InputGroup>
                      <FormControl type="email" placeholder="Email" onChange={this.emailChange} />
                    </InputGroup>
                  </FormGroup>
                </form>
              </div>
              <div className="password-box">
                <FormGroup>
                  <InputGroup>
                    <FormControl type="password" placeholder="Password" onChange={this.passwordChange}/>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="buttons-box">
                <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.login}>Log In</Button>
                <SignUp />
                </ButtonToolbar>
              </div> 
            </div>              
          </div>
          <div className="col-lg-2"> 
          </div>
        </div>
      </div>          
    );
  }
}

export default Login;