import React, { Component } from 'react';
import '../css/App.css';
import person from '../person.jpg';
import person2 from '../person2.png';
import { Table } from 'react-bootstrap';
import DoctCell from './DoctCell';

class DoctorTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
    }
    
    this.getDocs = this.getDocs.bind(this);
  }

  componentDidMount() {
    this.getDocs();
  }

  // Makes a GET reuest that returns all doctors in the database

  getDocs() {
    return fetch(`http://localhost:8080/api/v1/doctors.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function(response) {
      return response.json();
    }).then(data => {
      this.setState({doctors: data});
    });
  }

  // Saves array of doctors to local storage

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('Doctors', JSON.stringify(nextState.doctors))
  }

  // Individual doctor data is passed into DoctCell component which displays the data in a table

  render() {
    return (
      <div className="vol-feed">
        <Table responsive>
          <thead>
            <tr>
              <th> Doctors </th>
            </tr>
          </thead>
          <tbody>
            {this.state.doctors.map((doctor, i) =>
              <tr key={doctor.id}>
                <td>
                  <DoctCell 
                    firstName={doctor.user_first}
                    lastName={doctor.user_last}
                    rating={doctor.rating}
                    visitorCount={doctor.number_visits}
                    location={doctor.user_location}
                    bio={doctor.user_bio}
                    index={i}
                    doctors={this.state.doctors}
                  />
                </td>
              </tr>
            )}
          </tbody>
	      </Table>
      </div>
    );
  }
}

export default DoctorTable;