import React, { Component } from 'react';
import '../css/App.css';
import person from '../person.jpg';

class ProfileBody extends Component {
  render() {
    return (
      <div className="profile-first-section">
        <div className="profile-photo">
          <img src={person} alt='User'/>
        </div>
        <div className="profile-name">
          <h3>Ryan Schneinder</h3>
        </div>
        <div className="profile-user-stats">
          <div className="useRating">
            4/5<br/><b>Rating</b>
          </div>
          <div className="userVisits">
            10<br/><b>Visits</b>
          </div>
        </div>
        <div className='profile-bio'>
        </div>
      </div>          
    );
  }
}

export default ProfileBody;