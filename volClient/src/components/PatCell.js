import React, { Component } from 'react';
import '../css/App.css';
import person2 from '../person2.png';
import { Button } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class VolCell extends Component {
  constructor(props) {
    super(props);

    this.submitDecline = this.submitDecline.bind(this);
    this.submitAccept = this.submitAccept.bind(this);
  }


  submitDecline() {
    let statusData = {
      status: 2,
      appNum: this.props.apId
    }
    return fetch(`http://localhost:8080/api/v1/submitStatus.php`, {
      method: 'POST',
      body: JSON.stringify(statusData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(
      this.props.updateTable(this.props.index)
    );

  }

  submitAccept() {
    let statusData = {
      status: 1,
      appNum: this.props.apId
    }
    return fetch(`http://localhost:8080/api/v1/submitStatus.php`, {
      method: 'POST',
      body: JSON.stringify(statusData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(
      this.props.updateTable(this.props.index)
    );

  }

  render() {
    return (
      <div className="vol-cell">
        <div className="vol-photo">
          <img src={person2} alt='user'/>
        </div>
        <div className="vol-section">
          <div className="vol-table-topRow">
            <div className="vol-table-name">
              <b>{this.props.firstName} {this.props.lastName}</b>
            </div>
            <div className="vol-table-buttons">
              <ButtonToolbar>
                <Button bsStyle="primary" bsSize="xs" onClick={this.submitAccept}>Accept</Button>
                <Button bsStyle="primary" bsSize="xs" onClick={this.submitDecline}>Decline</Button>
              </ButtonToolbar>
            </div>
          </div>
          <div className="vol-table-desc">
            <div className="vol-table-desc-stats">
              <div className="vol-table-desc-stats-location">
                {this.props.location}
              </div> 
              <b>Rating: </b>{this.props.rating}
              <div className="vol-table-desc-stats-rating">
                <b>Date: </b>{this.props.date}
              </div>
            </div>
            <div className="vol-table-desc-bio">
              {this.props.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VolCell;