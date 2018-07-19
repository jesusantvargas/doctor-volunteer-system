import React, { Component } from 'react';
import '../css/App.css';
import person from '../person.jpg';
import person2 from '../person2.png';
import { Table } from 'react-bootstrap';
import PatCell from './PatCell';

class PatientTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
    }
    
    this.getRequests = this.getRequests.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  componentDidMount() {
    this.getRequests();
  }

  // Requests every appointment that patient has requested for a particular doctor

  getRequests() {
    let self = this;

    let data = {
      uid: this.props.uid
    }

    return fetch(`http://localhost:8080/api/v1/pendingRequests.php`, {
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
      this.setState({requests: data})
    })
  }

  // Removes item from table after a an appointment is accepted or declined

  updateTable(index) {
    this.state.requests.splice(index, 1)
    let arrNew = this.state.requests
    this.setState({requests: arrNew})
  }

  render() {
    return (
      <div className="vol-feed">
        <Table responsive>
          <thead>
            <tr>
              <th> Requested Service </th>
            </tr>
          </thead>
          <tbody>
            {this.state.requests.map((patient, i) =>
              <tr key={patient.id}>
                <td>
                  <PatCell 
                    firstName={patient.user_first}
                    lastName={patient.user_last}
                    description={patient.appointment_detail}
                    date={patient.appointment_date}
                    rating={patient.rating}
                    location={patient.user_location}
                    updateTable={this.updateTable}
                    index={i}
                    apId={patient.appointment_num}
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

export default PatientTable;