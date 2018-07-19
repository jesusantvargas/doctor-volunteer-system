import React, { Component } from 'react';
import '../css/App.css';
import ProfileBody from './ProfileBody';


class Profile2 extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-2"> 
          </div>
          <div className="col-lg-8"> 
            <ProfileBody />               
          </div>
          <div className="col-lg-2"> 
          </div>
        </div>
      </div>          
    );
  }
}

export default Profile2;