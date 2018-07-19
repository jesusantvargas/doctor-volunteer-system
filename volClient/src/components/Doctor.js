import React, { Component } from 'react';
import '../css/App.css';
import UserBox from './UserBox';
import UserDesc from './UserDesc';
import PatientTable from './PatientTable';
import HistoryTable from './HistoryTable';
import FutureTable from './FutureTable';

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    }
  }

  // Load user info from localStorage

  componentWillMount() {
    localStorage.getItem('User') && this.setState({
      user: JSON.parse(localStorage.getItem('User'))
    })
  }

  // Check to see if a user was loaded, if not, reroute back to login page

  componentDidMount() {
    console.log('Loaded User(DOC)', this.state.user)
    {this.state.user.length === 0 ?
      window.location = '/login'
    : null   
    }
  }

  // Information from our current user is passed in to different components as PROPS 
  // in order for the components to access the data

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">                
            {this.state.user.length > 0 ?                
              <UserBox 
                firstName={this.state.user[0].user_first} 
                lastName={this.state.user[0].user_last}
                userName={this.state.user[0].user_uid}
                rating={this.state.user[0].rating}
                visits={this.state.user[0].number_visits}
              />
            : null}
            {this.state.user.length > 0 ?
              <UserDesc
                location={this.state.user[0].user_location}
                bio={this.state.user[0].user_bio}
              />
            : null}
            <FutureTable />
          </div>
          <div className="col-lg-6">
            {this.state.user.length > 0 ?                
              <PatientTable 
                uid={this.state.user[0].user_id}
              />
            : null}
            <HistoryTable />
          </div>
        </div>
      </div>          
    );
  }
}

export default Doctor;