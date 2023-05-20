import React from 'react';
import './mytrip.css';
import { useState} from "react";
import { useParams, Link } from "react-router-dom";
import {useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover, 
    ComboboxList, 
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";  
  export default class Destination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tripId: null,
          tripData:"",
          destination: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }
      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tripId = params.get('tripId');
        this.setState({ userId: userId });
        this.setState({ tripId: tripId });
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
      }
    handleSubmit(e) {
    e.preventDefault();
    const {tripId,destination} = this.state;
    console.log (tripId, destination);
      fetch("http://localhost:5000/adddestination", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: localStorage.getItem("userId"),
      },
      body: JSON.stringify({
        destination,
        tripId,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userSubmit");
      if (data.status === "OK!") {
          alert('Submitted successfully!');
          this.form.reset();
      } else {
        alert(`went wrong: ${data.status}`);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Error! Something went wrong while calling the API.");
    });
}
    render(){
     const {destination, myPolls} = this.state;
        return(
            <div class="deetailplan">
   <form ref={form => this.form = form}  onSubmit = {this.handleSubmit}> 
         < Map />
         <input class="btndestination" type="submit" value="SELECT"/>
         </form>
            </div>
        );
    }
}
  function Map({destination}) {
        const [setSelected] = useState(null);
        const { isLoaded } = useLoadScript({
            googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
            libraries: ["places"],
          });
          if (!isLoaded) return <div>Loading...</div>;   
        return (
          <>
            <div className="places-container">
              <PlacesAutocomplete setSelected={setSelected} />
            </div>
           </>
        );
      }
const PlacesAutocomplete = ({ setSelected }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng }); 
    };
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-sinput"
          placeholder="Select a spot.."
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };