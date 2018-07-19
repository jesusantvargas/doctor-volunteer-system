import React, { Component } from 'react';
import '../css/App.css';
// import person2 from '../person2.png';
import { Table } from 'react-bootstrap';
import HistCell from './HistCell';

class HistoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      pastAppoint: []
    } 

    this.requestPastApps = this.requestPastApps.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  // Load user info from localStorage

  componentWillMount() {
    localStorage.getItem('User') && this.setState({
      user: JSON.parse(localStorage.getItem('User'))
    })
  }

  componentDidMount() {
    this.requestPastApps();
  }

  // Makes a request that returns all past appointments that have been accepted by doctor
  // Determines which route to call based on user role

  requestPastApps() {
    let self = this;

    let data = {
      uid: this.state.user[0].user_id,
      }

    if (this.state.user[0].user_role === 'patient') {
      return fetch(`http://localhost:8080/api/v1/history.php`, {
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
        this.setState({pastAppoint: data})
      })
    } else {
      return fetch(`http://localhost:8080/api/v1/historyForDoctorPage.php`, {
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
        this.setState({pastAppoint: data})
      })
    }
  }

  // Removes item from table after a review has been submitted

  updateTable(index) {
    this.state.pastAppoint.splice(index, 1)
    let arrNew = this.state.pastAppoint
    this.setState({pastAppoint: arrNew})
  }

  render() {
    return (
      <div className="history-table">
        <Table responsive>
          <thead>
            <tr>
              <th> History </th>
            </tr>
          </thead>
          <tbody>
            {this.state.pastAppoint.map((app, i) =>
              <tr key={app.id}>
                <td>
                  <HistCell 
                    firstName={app.user_first}
                    lastName={app.user_last}
                    visitCount={app.number_visits}
                    rating={app.rating}
                    uid={this.state.user[0].user_id}
                    doctorId={app.user_id}
                    date={app.appointment_date}
                    ratingSum={app.rating_sum}
                    updateTable={this.updateTable}
                    index={i}
                    myRole={this.state.user[0].user_role}
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

export default HistoryTable;