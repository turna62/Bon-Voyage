import React, { Component } from "react";
import './mytrip.css';

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      map: null,
      directionsDisplay: null,
      directionsService: null,
      output: "",
      userId: null, 
          tripId: null, 
          tripData:"",
          userData:"",
          destination: "",
          notifsData:[],
    };
    this.updateAllIsRead = this.updateAllIsRead.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
  }

  handlePlaceSelect = (place, inputType) => {
    const formattedAddress = place.formatted_address;
    if (inputType === "from") {
      this.setState({ from: formattedAddress });
    } else if (inputType === "to") {
      this.setState({ to: formattedAddress });
    }
  };

  handleCalcRoute = () => {
    const { directionsService, directionsDisplay, from, to, map } = this.state;

    if (!directionsService || !directionsDisplay) return;

    const request = {
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const output = `<div class='destinationinfo'><div class='alertdest'>Start Destination (A): ${from}.<br />End Destination (B): ${to}.<br /> Driving distance <i class='fas fa-road'></i> : ${result.routes[0].legs[0].distance.text}.<br />Duration <i class='fas fa-hourglass-start'></i> : ${result.routes[0].legs[0].duration.text}.</div></div>`;
        this.setState({ output });
        directionsDisplay.setDirections(result);
      } else {
        directionsDisplay.setDirections({ routes: [] });
        //center map in London
        map.setCenter({ lat: 23.777176, lng: 90.399452 });

        //show error message
        const output = "<div class='alert-danger'><div class='danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        this.setState({ output });
      }
    });
  };

  componentDidMount() {

    
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    };

    window.initMap = () => {
      const myLatLng = { lat: 23.777176, lng: 90.399452 };
      const mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };

      const newMap = new window.google.maps.Map(
        document.getElementById("googleMap"),
        mapOptions
      );
      this.setState({ map: newMap });

      const newDirectionsService = new window.google.maps.DirectionsService();
      this.setState({ directionsService: newDirectionsService });

      const newDirectionsDisplay = new window.google.maps.DirectionsRenderer();
      newDirectionsDisplay.setMap(newMap);
      this.setState({ directionsDisplay: newDirectionsDisplay });

      const fromAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("from")
      );
      const toAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("to")
      );

      fromAutocomplete.bindTo("bounds", newMap);
      toAutocomplete.bindTo("bounds", newMap);

      fromAutocomplete.addListener("place_changed", () => {
        const place = fromAutocomplete.getPlace();
        if (!place.geometry) return;
        this.handlePlaceSelect(place, "from");
      });

      toAutocomplete.addListener("place_changed", () => {
        const place = toAutocomplete.getPlace();
        if (!place.geometry) return;
        this.handlePlaceSelect(place, "to");
      });
    };
    
    const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tripId = params.get('tripId');
        
        console.log(userId); 
        console.log(tripId);
        this.setState({ userId: userId });
        this.setState({ tripId: tripId });


        fetch("http://localhost:5000/notifications",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tripId: tripId,
          userId: userId
        }),
      })
      .then((res) => res.json()) // convert data into JSON
      .then((data) => {
        console.log(data, "notifsData");
        this.setState({notifsData: data});
      });



        fetch("http://localhost:5000/tripData",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                
                tripId: tripId,
            
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "tripData");
            this.setState({tripData: data.data});
            if(data.data == 'Token Expired!'){
                alert("Token expired! Kindly login again."); 
                window.localStorage.clear();
                window.location.href = "./sign-in";
            }
        });

        fetch("http://localhost:5000/userData",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                userId: userId,
            
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "userData");
            this.setState({userData: data.data});
            if(data.data == 'Token Expired!'){
                alert("Token expired! Kindly login again."); 
                window.localStorage.clear();
                window.location.href = "./sign-in";
            }
        });
         
    const apiKey = "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo";
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`,
      () => {
        // Script loaded callback
      }
    );
  }


  handleSubmit(e){
    e.preventDefault();
    const { destination, userId, tripId } = this.state;
    
    console.log(destination, userId, tripId);
    fetch("http://localhost:5000/itinerary", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: localStorage.getItem("userId") ,
      //  authorization: localStorage.getItem("email") ,
      },
      body: JSON.stringify({
        destination,
        userId,
        tripId
        
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "itinerarySubmit");
        if (data.status === "OK!") {
            
            alert('submitted Successfully!');
            window.localStorage.setItem('itineraryId', data.itineraryId);
            window.location.href = `http://localhost:3000/myitinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}&itineraryId=${data.itineraryId}`;

        } else {
          alert(`went wrong: ${data.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error! Something went wrong while calling the API.");
      });
  }

  updateAllIsRead = () => {
    const params = new URLSearchParams(window.location.search);
   const userId = params.get('userId');
   const tripId = params.get('tripId');
   
   console.log(userId); 
   console.log(tripId);
   this.setState({ userId: userId });
   this.setState({ tripId: tripId });
   const unreadNotifs = this.state.notifsData.filter((notif) => !notif.isRead);
   const unreadNotifIds = unreadNotifs.map((notif) => notif._id);

 
   fetch('http://localhost:5000/notifications/read', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
     body: JSON.stringify({ userId:userId, tripId:tripId }),
   })
     .then((res) => res.json())
     .then((data) => {
       // Update the notifsData state to mark all notifications as read
       const updatedNotifsData = this.state.notifsData.map((notif) => ({
         ...notif,
         isRead: true,
       }));
       this.setState({ notifsData: updatedNotifsData });
     })
     .catch((error) => console.error(error));
 };

  render() {
  const { from, to, output } = this.state;
  
  return (

    <div class="deetailplan">
 
         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                      
                    <li class="nav-item">
                        

                        <a class="nav-link page-scroll">
  <button onClick={this.updateAllIsRead}>
    <span class="notif-icon">
      <i class="fas fa-bell"></i>
      {this.state.notifsData.filter(notif => !notif.isRead).length > 0 && (
        <span class="notif-count">
          {this.state.notifsData.filter(notif => !notif.isRead).length}
        </span>
      )}
    </span>
  </button>
</a> 
<div class="notifications-container">
  <ul>
    {this.state.notifsData.map((notif, index) => (
      <li key={index}>
        <p>{notif.message}</p>
        <p>{notif.createdAt}</p>
      </li>
    ))}
  </ul>
</div>
 
  
  
</li>
                    <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}> <i class='fas fa-user-circle'></i> MY PROFILE</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro"><i class="fa fa-sign-out"></i> LOG OUT</a>
                        </li>
                    
                    
                        
                  </ul>

              </div>
         </nav>

         <header id="header" class="headerr">
                <div class="header-content">
                    <div class="container"> 
                        <div class="row">
                            <div class="col-lg-12">
                            <div class="text-container">
                                    <h1 ><div class="lets">Let's Plan,</div><div class="js-rotating"> {this.state.userData.username}!</div></h1>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 
     <div>

        <h4 class="tripname">{this.state.tripData.tripName}</h4><hr></hr>
        <a class="btnaddmembers" href={`http://localhost:3000/addmembers?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>+ Add Members</a>

        <ul class="ul">
        <li class="li"> <a href={`http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Overview</a></li>
        <li class="li"> <a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Polls</a></li>
        <li class="li"> <a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Destination</a></li>
        <li class="li"> <a href={`http://localhost:3000/date?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Date</a></li>
        <li class="ovwli"> <a href={`http://localhost:3000/route?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Route</a></li>
        <li class="li"> <a href={`http://localhost:3000/itinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Itinerary</a></li>
     </ul>

     </div> 

    <div class="routebody">
      <div className="input-group mb-3">
      <p class="startdestext destxt"><i className="fas fa-map-marker-alt"></i> Start Destination:</p>

        <input
          id="from"
          type="text"
          className="startdesinput"
          placeholder="Enter starting location"
          onChange={(event) => this.setState({ from: event.target.value })}
          value={from}
        />
      </div>
      <div className="input-group mb-3">
        <p class="enddestext destxt">  <i className="fas fa-flag-checkered"></i>End Destination:</p>
        <input
          id="to"
          type="text"
          className="enddesinput"
          placeholder="Enter destination"
          onChange={(event) => this.setState({ to: event.target.value })}
          value={to}
        />
         <button className="routebtn" type="button" onClick={this.handleCalcRoute}>Calculate   
      </button>
     
      </div>
      <div className="mt-3" dangerouslySetInnerHTML={{ __html: output }}></div>
      <div id="googleMap" style={{ height: "100vh", marginTop: "20px" }}></div>
    </div>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4>Few Words About Bon Voyage!</h4>
                        <p class="white">We are passionate about helping you to arrange your trip as best as we can.</p></div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Links</h4>
                        <ul class="list-unstyled li-space-lg white">
                            <li>
                                <a class="white" href="#your-link">startupguide.com</a>
                            </li>
                            <li>
                                <a class="white" href="terms-conditions.html">Terms & Conditions</a>
                            </li>
                            <li>
                                <a class="white" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Tools</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">businessgrowth.com</a>
                            </li>
                            <li>
                               <a class="white" href="#your-link">influencers.com</a>
                            </li>
                            <li class="media">
                                <a class="white" href="#your-link">optimizer.net</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Partners</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">unicorns.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">staffmanager.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">association.gov</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
            </div>
        </div> 
    </div> 
    
        
    </div>
            
   
  );
}
}

export default Places;  
