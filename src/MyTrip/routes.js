import React, { useState, useEffect } from "react";
import './style.css';

function Places() {
  
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [map, setMap] = useState(null);
  const [directionsDisplay, setDirectionsDisplay] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [output, setOutput] = useState("");

  const handlePlaceSelect = (place) => {
    console.log(place);
  };
  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleCalcRoute = () => {
    if (!directionsService || !directionsDisplay) return;
    //create request
    const request = {
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
    };

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        //Get distance and time
        setOutput(
          "<div class='alert-info'>From: " +
            from +
            ".<br />To: " +
            to +
            ".<br /> Driving distance <i class='fas fa-road'></i> : " +
            result.routes[0].legs[0].distance.text +
            ".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
            result.routes[0].legs[0].duration.text +
            ".</div>"
        );

        //display route
        directionsDisplay.setDirections(result);
      } else {
        //delete route from map
        directionsDisplay.setDirections({ routes: [] });
        //center map in London
        map.setCenter({ lat: 38.3460, lng: -0.4907 });

        //show error message
        setOutput(
          "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>"
        );
      }
    });
  };

  useEffect(() => {
    //load google map script
    const loadScript = (url) => {
      const index = window.document.getElementsByTagName("script")[0];
      const script = window.document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      index.parentNode.insertBefore(script, index);
    };

    window.initMap = () => {
      const myLatLng = { lat: 38.3460, lng: -0.4907 };
      const mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };

      //create map
      const newMap = new window.google.maps.Map(
        document.getElementById("googleMap"),
        mapOptions
      );
      setMap(newMap);

      //create a DirectionsService object to use the route method and get a result for our request
      const newDirectionsService = new window.google.maps.DirectionsService();
      setDirectionsService(newDirectionsService);

      //create a DirectionsRenderer object which we will use to display the route
      const newDirectionsDisplay = new window.google.maps.DirectionsRenderer();
      newDirectionsDisplay.setMap(newMap);
      setDirectionsDisplay(newDirectionsDisplay);

     
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo&callback=initMap`
    );
  }, []);

  return (
    <div>
      <div className="input-group mb-3">
        <input
          id="from"
          type="text"
          className="form-control"
          placeholder="Enter origin"
          onChange={handleFromChange}
          value={from}
    />
      </div>
      <div className="input-group mb-3">
        <input
      id="to"
      type="text"
      className="form-control"
      placeholder="Enter destination"
      onChange={handleToChange}
      value={to}
    />
      </div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleCalcRoute}
      >
        Calculate route
      </button>
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: output }}
      ></div>
      <div id="googleMap" style={{ height: "500px", marginTop: "20px" }}></div>
    </div>
  );
}

export default Places;