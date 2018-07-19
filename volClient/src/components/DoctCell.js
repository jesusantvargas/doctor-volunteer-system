import React, { Component } from 'react';
import '../css/App.css';
import person2 from '../person2.png';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';

class DoctCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      details: '',
      date: '',
      user: [],
      docIndex: '',
      doctorId: ''
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.appointRequest = this.appointRequest.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

   // Load user info from localStorage

  componentWillMount() {
    localStorage.getItem('User') && this.setState({
      user: JSON.parse(localStorage.getItem('User'))
    })
  }

  // Handle close and show determine whether the Modals are being displayed or not

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
    this.setState({
      docIndex: this.props.index,
    })
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  detailsChange (e) {
    this.setState({
      details: e.target.value
    })
  }

  dateChange (e) {
    this.setState({
      date: e.target.value
    })
  }

  // Create new entry inside appointment table in our DB

  appointRequest () {

    if (this.state.details === "") {
      alert("Detail section must be filled out.");
      return false;
    }

    if (this.state.date === "") {
      alert("A date must be selected.");
      return false;
    }

    this.setState({ doctorId: this.props.doctors[this.state.docIndex].user_id})
    let self = this;
    let appointmentData = {
      date: this.state.date,
      details: this.state.details,
      uid: this.state.user[0].user_id,
      uidVol: this.state.doctorId
    }
    console.log(appointmentData);
    return fetch(`http://localhost:8080/api/v1/request.php`, {
      method: 'POST',
      body: JSON.stringify(appointmentData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  render() {
    return (
      <div className="vol-cell">
        <div className="vol-photo">
          <img src={person2}/>
        </div>
        <div className="vol-section">
          <div className="vol-table-topRow">
            <div className="vol-table-name">
              <b>{this.props.firstName} {this.props.lastName}</b>
            </div>
            <div className="vol-table-buttons">
              <ButtonToolbar>
                <Button bsStyle="primary" bsSize="xs" onClick={this.handleShow}>Request Service</Button>
              </ButtonToolbar>
            </div>
          </div>
          <div className="vol-table-desc">
            <div className="vol-table-desc-stats">
              <div className="vol-table-desc-stats-location">
                  {this.props.location}
              </div>
              <b>Visits: </b>{this.props.visitorCount}
              <div className="vol-table-desc-stats-rating">
                <b>Rating: </b>{this.props.rating}
              </div>
            </div>
            <div className="vol-table-desc-bio">
              {this.props.bio}
            </div>
          </div>
        </div>
        {this.state.show ? (
          <Modal.Dialog show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Request Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Appointment Description
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="textarea" placeholder="Tell us about yourself and what you do." onChange={this.detailsChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Date
                </Col>
                <Col sm={10}>
                  <input type="date" name="date" onChange={this.dateChange}/>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.appointRequest}>Done</Button>
          </Modal.Footer>
        </Modal.Dialog>
        ) : null}
      </div>
    );
  }
}

export default DoctCell;