import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './TripSection.css';

class TripSection extends React.Component {
  state = {
    userId: '',
    myTrips: [],
    joinedTrips: []
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    
    console.log(userId);
    this.setState({ userId: userId });
    
    fetch("http://localhost:5000/trips",{
      method: "POST",
      crossDomain: true,
      headers:{
          "Content-Type":"application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    .then((res) => res.json()) // convert data into JSON
    .then((data) => {
      console.log(data, 'trips');
      if (data.status === 'OK!') {
        this.setState({ myTrips: data.trips });
      } else {
        alert('Error! Something went wrong!');
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while retrieving");
    });
  
    fetch("http://localhost:5000/joinedtrips",{
      method: "POST",
      crossDomain: true,
      headers:{
          "Content-Type":"application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    .then((res) => res.json()) // convert data into JSON
    .then((data) => {
      console.log(data, 'joined trips');
      if (data.status === 'OK!') {
        this.setState({ joinedTrips: data.trips });
      } else {
        alert('Error! Something went wrong!');
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while retrieving");
    });
  }
  
  render() {
    const { myTrips, joinedTrips } = this.state;
  
    return (
      <div>
        <h2>My Created Trips</h2>
        <ul>
        {myTrips.map((trip, index) => (
        <li key={trip._id}>
       <Link to={`/overview?userId=${this.state.userId}&tripId=${trip._id}`}className="no-underline">{index + 1}. {trip.tripName}</Link>
       </li>
))}

        </ul>
  
        <h2>Joined Trips</h2>
        <ul>
          {joinedTrips.map((trip, index) => (
            <li key={trip._id}>
            <Link to={`/overview?userId=${this.state.userId}&tripId=${trip._id}`}className="no-underline">{index + 1}.{trip.tripName}</Link>


            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TripSection;


