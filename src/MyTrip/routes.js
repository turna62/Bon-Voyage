import React, { useState, useEffect } from "react";
//import './style.css';

function Places() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [map, setMap] = useState(null);
  const [directionsDisplay, setDirectionsDisplay] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [output, setOutput] = useState("");

  const handlePlaceSelect = (place, inputType) => {
    const formattedAddress = place.formatted_address;
    if (inputType === "from") {
      setFrom(formattedAddress);
    } else if (inputType === "to") {
      setTo(formattedAddress);
    }
  };

  const handleCalcRoute = () => {
    if (!directionsService || !directionsDisplay) return;

    const request = {
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
    };

    directionsService.route(request, function (result, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setOutput(
          `<div class='alert-info'>From: ${from}.<br />To: ${to}.<br /> Driving distance <i class='fas fa-road'></i> : ${result.routes[0].legs[0].distance.text}.<br />Duration <i class='fas fa-hourglass-start'></i> : ${result.routes[0].legs[0].duration.text}.</div>`
        );
        directionsDisplay.setDirections(result);
      } else {
        directionsDisplay.setDirections({ routes: [] });
        //center map in London
        map.setCenter({ lat:  23.777176, lng: 90.399452 });

        //show error message
        setOutput(
          "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>"
        );
      }
    });
  };

  useEffect(() => {
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
      setMap(newMap);

      const newDirectionsService = new window.google.maps.DirectionsService();
      setDirectionsService(newDirectionsService);

      const newDirectionsDisplay = new window.google.maps.DirectionsRenderer();
      newDirectionsDisplay.setMap(newMap);
      setDirectionsDisplay(newDirectionsDisplay);

      const fromAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("from")
      );
      const toAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("to")
      );

      fromAutocomplete.bindTo("bounds", newMap);
      toAutocomplete.bindTo("bounds", newMap);

      fromAutocomplete.addListener("place_changed", function () {
        const place = fromAutocomplete.getPlace();
        if (!place.geometry) return;
        handlePlaceSelect(place, "from");
      });

      toAutocomplete.addListener("place_changed", function () {
        const place = toAutocomplete.getPlace();
        if (!place.geometry) return;
        handlePlaceSelect(place, "to");
      });
    };

    const apiKey = "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo";
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`,
      () => {
        // Script loaded callback
      }
    );
  }, []);

  return (
    <div>
      <div className="input-group mb-3">
        <input
          id="from"
          type="text"
          className="form-control"
          placeholder="Enter starting location"
          onChange={(event) => setFrom(event.target.value)}
          value={from}
        />
      </div>
      <div className="input-group mb-3">
        <input
          id="to"
          type="text"
          className="form-control"
          placeholder="Enter destination"
          onChange={(event) => setTo(event.target.value)}
          value={to}
        />
      </div>
      <button className="btn btn-primary" type="button" onClick={handleCalcRoute}>
        Calculate route
      </button>
      <div className="mt-3" dangerouslySetInnerHTML={{ __html: output }}></div>
      <div id="googleMap" style={{ height: "500px", marginTop: "20px" }}></div>
    </div>
  );
}

export default Places;

