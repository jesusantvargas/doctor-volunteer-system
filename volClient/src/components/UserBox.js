import React, { Component } from 'react';
import '../css/App.css';
import person from '../person.jpg';
import { Button, ButtonToolbar } from 'react-bootstrap';

class UserBox extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  // Handles redirect if user clicks on logout button

  handleLogout() {
    window.location = '/login'
  }

  // This component doesn't request any data, it just handles the data passed in from the parent component


  render() {
    return (
      <div className="user-box">
        <div className="user-photo">
          <img src={person}/>
        </div>
        <div className="user-names">
          <div className="full-name">
            <div>
              {this.props.firstName} {this.props.lastName}
            </div>
          </div>
          <div className="userName">
            @{this.props.userName}
          </div>
        </div>
        <div className="user-stats">
          <div className="useRating">
          {this.props.rating}/5<br/><b>Rating</b>
          </div>
          <div className="userVisits">
          {this.props.visits}<br/><b>Visits</b>
          </div>
        </div>
        <div className="user-logout">
          <Button bsStyle="primary" bsSize="xs" onClick={this.handleLogout}>Logout</Button>
        </div>
      </div>
    );
  }
}

export default UserBox;