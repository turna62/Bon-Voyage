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
          userId: null, 
          tripId: null,
          tripData:"",
          userData:"",
          notifsData:[],
          myPolls:[], 
          notifsData:[],
          destination: ""
          
        };
        this.setDestination = this.setDestination.bind(this);
        this.updateAllIsRead = this.updateAllIsRead.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }
      setDestination(newDestination) {
        this.setState({ destination: newDestination });
      }

      componentDidMount() {
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

        fetch("http://localhost:5000/dgetpolls",{
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
          console.log(data, 'my polls');
         
          if (data.status === 'OK!') {
            this.setState({ myPolls: data.polls });
          } else {
            //alert('Error! Something went wrong!');
          }
        })
        .catch((error) => {
          console.error(error);
          alert("ok");
        });
      }

      handleSubmit(e) {
        e.preventDefault();
        const {tripId, destination} = this.state;
        console.log (tripId, destination);
          fetch("http://localhost:5000/adddestination", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
           // authorization: localStorage.getItem("userId"),
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
              console.log(destination);
              //this.form.reset();
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

    render(){
    
      const {myPolls} = this.state;
      const { destination } = this.state;

        return(
            <div class="deetailplan">

         <form onSubmit={this.handleSubmit}>
         < Map destination={destination} setDestination={this.setDestination} />
         <input class="btndestination" type="submit" value="SELECT"/>
         </form>
            </div>
        );

    }
}


function Map({ destination, setDestination }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleSelect = (address) => {
    setDestination(address);
  };

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          handleSelect={handleSelect}
          destination={destination}
        />
      </div>
    </>
  );
}


const PlacesAutocomplete = ({
  destination,
  setDestination,
  setSelected,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setDestination({ lat, lng });
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