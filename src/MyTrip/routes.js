import { useMemo } from "react";
import './mytrip.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map /> ;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}