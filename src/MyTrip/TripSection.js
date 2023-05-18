import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './mytrip.css';

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

      <div class="tripsectionbody">
 
      <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
             <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
             <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                 <ul class="navbar-nav ml-auto">
                 <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro"><i class="fa fa-sign-out"></i> LOG OUT</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/myprofile`}> <i class='fas fa-user-circle'></i> MY PROFILE</a>
                        </li>
                    
                    
                     
               </ul>

           </div>
      </nav>
 
      <h2 class="thead">My Trips  <h5 class="thead1">To see the details of the trips, click on the trip name.</h5> </h2>

      <div class="trips">
<div class="tcreated">
        <h4>Created Trips: ({myTrips.filter(trip => !trip.deleted).length})</h4><hr class="hr1"></hr>
        <p className="mytrip1">
  {myTrips.filter(trip => !trip.deleted).reverse().map((trip, index) => {
    let count = index + 1; // start count at 1
    return (
      <p key={trip._id}>
        <Link to={`/overview?userId=${this.state.userId}&tripId=${trip._id}`} className="no-underline">
          {count}. {trip.tripName}
        </Link>
      </p>
    );
  })}
</p>
</div>


   <div class="tjoined">    
  
        <h4>Joined Trips: ({joinedTrips.filter(trip => !trip.deleted).length})</h4>
        <hr class="hr1"></hr>
        <p class="joinedtrip">
        {joinedTrips.filter(trip => !trip.deleted).reverse().map((trip, index) => {
    let count = index + 1; // start count at 1
    return (
      <p key={trip._id}>
        <Link to={`/overview?userId=${this.state.userId}&tripId=${trip._id}`} className="no-underline">
          {count}. {trip.tripName}
        </Link>
      </p>
    );
  })}
</p></div>

        </div>

        </div>
    );
  }
}

export default TripSection;


