import React, { Component } from 'react';
import '../css/App.css';
import person2 from '../person2.png';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, Form, FormControl, FormGroup, ControlLabel, Radio } from 'react-bootstrap';

class HistCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  // Submits review to db and also updates visit count and rating sum to determine average

  submitReview() {
    var newSum = 0;
    var newCount = 0;
    var avg = 0;

    if (this.state.value > 0) {
      newSum = parseInt(this.state.value) + parseInt(this.props.ratingSum);
      newCount = parseInt(this.props.visitCount) + 1;
      avg = newSum / newCount;
    }

    let self = this;
    let reviewData = {
      rating: avg,
      uid: this.props.uid,
      visitCount: newCount,
      updatedSum: newSum,
      reviewDone: 1,
      volId: this.props.doctorId,
      appDate: this.props.date
    }
    if (this.props.myRole === 'patient') {
      console.log('reviewData', reviewData);
      return fetch(`http://localhost:8080/api/v1/submitReview/submitReview.php`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(function(response) {
        return response.json();
      }).then(data => {
        console.log('Status of Put', data);
      })
      .then(
        this.props.updateTable(this.props.index)
      );
    } else {
      console.log('reviewData', reviewData);
      return fetch(`http://localhost:8080/api/v1/submitReview/submitReviewDoc.php`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(function(response) {
        return response.json();
      }).then(data => {
        console.log('Status of Put', data);
      })
      .then(
        this.props.updateTable(this.props.index)
      );
    }
  }


  render() {
    return (
      <div className="hist-cell">
        <div className="hist-photo">
          <img src={person2}/>
        </div>
        <div className="hist-table-topRow">
          <div className="hist-table-name">
            {this.props.firstName} {this.props.lastName}
          </div>
          <div className="hist-table-buttons">
          <Form>
            <FormGroup>
              <Radio name="radioGroup" inline value='1' onChange={this.handleChange}>
                1
              </Radio>{' '}
              <Radio name="radioGroup" inline value='2' onChange={this.handleChange}>
                2
              </Radio>{' '}
              <Radio name="radioGroup" inline value='3' onChange={this.handleChange}>
                3
              </Radio>{' '}
              <Radio name="radioGroup" inline value='4' onChange={this.handleChange}>
                4
              </Radio>{' '}
              <Radio name="radioGroup" inline value='5' onChange={this.handleChange}>
                5
              </Radio>
            </FormGroup>
            <Button bsStyle="primary" bsSize="xs" onClick={this.submitReview}>Submit</Button>
          </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default HistCell;