import React, { Component } from 'react';
import '../css/App.css';
import { Form, FormControl, FormGroup, Button, Modal, ControlLabel, Col } from 'react-bootstrap';



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      regEmail: '',
      regPassword: '',
      username: '',
      location: '',
      bio: '',
      phone: '',
      role: '',
      show: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.regEmailChange = this.regEmailChange.bind(this);
    this.regPasswordChange = this.regPasswordChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.bioChange = this.bioChange.bind(this);
    this.roleChange = this.roleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  // Sign Up Fields
  firstNameChange (e) {
    this.setState({
      firstName: e.target.value
    })
  }

  lastNameChange (e) {
    this.setState({
      lastName: e.target.value
    })
  }

  regEmailChange (e) {
    this.setState({
      regEmail: e.target.value
    })
  }

  regPasswordChange (e) {
    this.setState({
      regPassword: e.target.value
    })
  }
  phoneChange (e) {
    this.setState({
      phone: e.target.value
    })
  }

  usernameChange (e) {
    this.setState({
      username: e.target.value
    })
  }

  locationChange (e) {
    this.setState({
      location: e.target.value
    })
  }

  bioChange (e) {
    this.setState({
      bio: e.target.value
    })
  }

  roleChange (e) {
    this.setState({
      role: e.target.value
    })
  }

  signUp (e) {

    if (this.state.firstName === "") {
      alert("Please submit a first name");
      return false;
    }

    if (this.state.lastName === "") {
      alert("Please submit a last name");
      return false;
    }

    if (this.state.regEmail === "") {
      alert("Please submit an email");
      return false;
    }

    if (this.state.regPassword === "") {
      alert("Please submit a password");
      return false;
    }

    if (this.state.phone === "") {
      alert("Please submit a phone number");
      return false;
    }

    if (this.state.username === "") {
      alert("Please submit a username");
      return false;
    }

    if (this.state.location === "") {
      alert("Please submit a location");
      return false;
    }

    if (this.state.bio === "") {
      alert("Please submit a bio");
      return false;
    }

    if (this.state.role === "") {
      alert("Please submit a role");
      return false;
    }

    let regData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      regEmail: this.state.regEmail,
      regPassword: this.state.regPassword,
      username: this.state.username,
      location: this.state.location,
      bio: this.state.bio,
      phone: this.state.phone,
      role: this.state.role,
      rating: 0,
      visits: 0
    }
    console.log(regData);
    return fetch(`http://localhost:8080/api/v1/register.php`, {
      method: 'POST',
      body: JSON.stringify(regData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this.setState({ show: false }));
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className="sign-up-form">
        <Button bsStyle="primary" onClick={this.handleShow}>Sign Up</Button>
        {this.state.show ? (
        <Modal.Dialog show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="First Name" onChange={this.firstNameChange}/>
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Last Name" onChange={this.lastNameChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Email" onChange={this.regEmailChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" onChange={this.regPasswordChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Phone
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Phone Number" onChange={this.phoneChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Username" onChange={this.usernameChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Location
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="City" onChange={this.locationChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Bio
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="textarea" placeholder="Tell us about yourself and what you do." onChange={this.bioChange}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select Role</ControlLabel>
                <FormControl componentClass="select" placeholder="Role" onChange={this.roleChange}>
                  <option value="">Roles</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.signUp}>Done</Button>
          </Modal.Footer>
        </Modal.Dialog>
        ) : null}
      </div>          
    );
  }
}

export default SignUp;