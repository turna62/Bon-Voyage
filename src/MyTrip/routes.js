import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

function Places() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
    libraries: ["places"],
  });

  function calculateRoute() {
    if (
      originRef.current.value === "" ||
      destinationRef.current.value === ""
    ) {
      return;
    }
    const directionsService = new DirectionsService();
    directionsService.route(
      {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: "DRIVING",
      },
      (results, status) => {
        if (status === "OK") {
          setDirectionsResponse(results);
          setDistance(results.routes[0].legs[0].distance.text);
          setDuration(results.routes[0].legs[0].duration.text);
        } else {
          console.error(`error fetching directions ${status}`);
        }
      }
    );
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {isLoaded ? (
        <GoogleMap
          center={center}
          zoom={15}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
      <div
        style={{
          position: "absolute",
          top: "4rem",
          right: "2rem",
          zIndex: "1",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ display: "flex", marginBottom: "0.5rem" }}>
          <Autocomplete onLoad={(autocomplete) => autocomplete}>
            <input
              type="text"
              placeholder="Origin"
              ref={originRef}
              style={{ flexGrow: 1, marginRight: "0.5rem" }}
            />
          </Autocomplete>
          <Autocomplete onLoad={(autocomplete) => autocomplete}>
            <input
              type="text"
              placeholder="Destination"
              ref={destinationRef}
              style={{ flexGrow: 1, marginRight: "0.5rem" }}
            />
          </Autocomplete>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={calculateRoute}>Calculate Route</button>
            <button onClick={clearRoute}>Clear Route</button>
</div>
</div>
{directionsResponse && (
<div style={{ display: "flex", alignItems: "center" }}>
<div style={{ marginRight: "0.5rem" }}>Distance: {distance}</div>
<div>Duration: {duration}</div>
</div>
)}
</div>
</div>
);
}

export default Places;





