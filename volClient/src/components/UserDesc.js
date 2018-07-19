import React, { Component } from 'react';
import '../css/App.css';

class UserDesc extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    // This component doesn't request any data, it just handles the data passed in from the parent component

    return (
      <div className="user-desc">
        <div className="user-location">
          <div className="location-pos">
            <b>Location:</b> {this.props.location}
          </div>
        </div>
        <div className="user-bio">
          <b>Bio:</b> {this.props.bio}
        </div>
      </div>
    );
  }
}

export default UserDesc;