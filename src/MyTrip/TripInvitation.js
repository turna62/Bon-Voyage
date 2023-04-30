import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

class TripInvitation extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccSubmit = this.handleAccSubmit.bind(this);
    this.handleDecSubmit = this.handleDecSubmit.bind(this);
    this.state = {
      userId: null,
      tripId: null
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const tripId = params.get('tripId');
    console.log(userId, tripId);
    this.setState({ userId: userId, tripId: tripId });
  }

  handleAccSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/tripinvitation/accept", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    userId: this.state.userId,
    tripId: this.state.tripId,
  }),
})
// .then((res) =>   res.json()) 
 
//   alert("HOISE");

//   window.location.href=`http://localhost:3000/detailtripplan?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.trId)}`;


// .catch((error) => {
//   console.error(error);
//   alert("An error occurred while accepting the trip invitation.");
// });
// };handleAccSubmit = (e) => {
  e.preventDefault();

  fetch("http://localhost:5000/tripinvitation/accept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: this.state.userId,
      tripId: this.state.tripId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'tripInvitation');
      if (data.status === 'OK!') {
        alert('Trip Invitation Accepted Successfully! You can head to your invited trip!');
        window.location.href = `http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`;
      } else {
        alert('Error! Something went wrong!');
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while accepting the trip invitation.");
    });
};



  handleDecSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/tripinvitation/decline", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: this.state.userId,
        tripId: this.state.tripId,
      }),
    })
      .then((res) => res.json())
      
        alert("Invitation declined");
    
  };

  render() {
    return (
      <div>
        

        <div>
          <div>
            <p>Do you wish to accept this trip invitation?</p>

            <button  style={{ backgroundColor: 'blue', color: 'white' }} onClick={this.handleAccSubmit}>Yes, Accept </button>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={this.handleDecSubmit}>No, Decline</button></div>
          
        </div>
      </div>
    );
  }
}

export default TripInvitation;
