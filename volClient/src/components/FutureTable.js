import React, { Component } from 'react';
import '../css/App.css';
import { Table } from 'react-bootstrap';

class FutureTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      upcomingAppoint: []
    } 

    this.requestUpcomingApps = this.requestUpcomingApps.bind(this);

  }

  // Load user info from localStorage

  componentWillMount() {
    localStorage.getItem('User') && this.setState({
      user: JSON.parse(localStorage.getItem('User'))
    })
  }

  componentDidMount() {
    this.requestUpcomingApps();
  }

  // Makes a request that returns all upcoming appointments that have been accepted by doctor
  // Determines which route to call based on user role

  requestUpcomingApps() {
    let self = this;

    let data = {
      uid: this.state.user[0].user_id,
    }
    if (this.state.user[0].user_role === 'patient') {
      return fetch(`http://localhost:8080/api/v1/upcoming.php`, {
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
        this.setState({upcomingAppoint: data})
      })
    } else {
      return fetch(`http://localhost:8080/api/v1/upcomingForDoctorPage.php`, {
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
        this.setState({upcomingAppoint: data})
        console.log('Response', this.state.upcomingAppoint);
      })
    }
  }


  render() {
    return (
      <div className="future-visits">
        <Table responsive>
          <thead>
            <tr>
              <th> Upcoming Visits </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.upcomingAppoint.map((app, i) =>
              <tr key={app.id} >
                <td scope="row">{app.user_first} {app.user_last}</td>
                <td scope="row">{app.user_location}</td>
                <td scope="row">{app.appointment_date}</td>
                <td scope="row">{app.phone_number}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default FutureTable;