import React, { Component } from "react";
//import './style.css';

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      map: null,
      directionsDisplay: null,
      directionsService: null,
      output: ""
    };
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
        const output = `<div class='alert-info'>From: ${from}.<br />To: ${to}.<br /> Driving distance <i class='fas fa-road'></i> : ${result.routes[0].legs[0].distance.text}.<br />Duration <i class='fas fa-hourglass-start'></i> : ${result.routes[0].legs[0].duration.text}.</div>`;
        this.setState({ output });
        directionsDisplay.setDirections(result);
      } else {
        directionsDisplay.setDirections({ routes: [] });
        //center map in London
        map.setCenter({ lat: 23.777176, lng: 90.399452 });

        //show error message
        const output = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
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
    
    const apiKey = "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo";
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`,
      () => {
        // Script loaded callback
      }
    );
  }

  render() {
  const { from, to, output } = this.state;
  
  return (
    <div>
      <div className="input-group mb-3">
        <input
          id="from"
          type="text"
          className="form-control"
          placeholder="Enter starting location"
          onChange={(event) => this.setState({ from: event.target.value })}
          value={from}
        />
      </div>
      <div className="input-group mb-3">
        <input
          id="to"
          type="text"
          className="form-control"
          placeholder="Enter destination"
          onChange={(event) => this.setState({ to: event.target.value })}
          value={to}
        />
      </div>
      <button className="btn btn-primary" type="button" onClick={this.handleCalcRoute}>
        Calculate route
      </button>
      <div className="mt-3" dangerouslySetInnerHTML={{ __html: output }}></div>
      <div id="googleMap" style={{ height: "100vh", marginTop: "20px" }}></div>
    </div>
  );
}
}

export default Places;  
