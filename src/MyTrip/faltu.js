
import React, { Component } from 'react';
import './mytrip.css';
import { useLoadScript } from "@react-google-maps/api";
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

class CreatePollD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      tripId: props.tripId,
      userId: props.userId
    };
    this.setOptions = this.setOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
  }
  setOptions(newOptions) {
    this.setState({ options: newOptions });
  }
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const tripId = params.get('tripId');
    console.log(userId); 
    console.log(tripId);
    this.setState({ userId: userId });
    this.setState({ tripId: tripId });
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    };
  }
  handleSubmit(e, isTripOwner) {
    e.preventDefault();
    const {options, tripId, userId } = this.state;
    console.log (tripId, userId, options);
  
    // Set the addedMembers data based on the user role
    let addedMembers;
    if (isTripOwner) {
      addedMembers = null; // Trip owner has no added members
    } else {
      addedMembers = [userId]; // Added member is the current user
    }
    console.log( addedMembers);
      fetch("http://localhost:5000/dcreatepoll", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: localStorage.getItem("userId"),
      },
      body: JSON.stringify({
        options,
        tripId,
        userId,
        addedMembers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "pollSubmit");
        if (data.status === "OK!") {
          alert("Poll created!");
          console.log(tripId);
         
        } else {
          alert(`went wrong: ${data.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error! Something went wrong while calling the API.");
      });
  }
  render() {
    return(
              <form onSubmit={(e) => this.handleSubmit(e, this.props.isTripOwner)}>
                <h5 className="ccpll1">Add up to 05 places:</h5>
                <Map options={this.state.options} />
                <input className="btncdestination" type="submit" value="LAUNCH POLL" />
              </form>
    );
  }}
function Map({options }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  const handleSelect = (option, index) => {
    const updatedOptions = [...options]; // Create a copy of options array
    updatedOptions[index] = option.address; // Update the selected option at the specified index
    this.state.setOptions(updatedOptions);
  };
  return (
    <>
      <div className="places-container">
      <div className="spot-input">
       <PlacesAutocomplete onSelect={handleSelect} index={0} />
       </div>
        <div className="spot-input">
       <PlacesAutocomplete onSelect={handleSelect} index={1} />
      </div>
</div>
    </>
  );
}
const PlacesAutocomplete = ({ onSelect, index, options }) => {
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
    onSelect({ address, lat, lng }, index);
    const updatedOptions = [...options]; // Create a copy of options array
    updatedOptions[index] =address; // Update the selected option at the specified index
    this.setState({ options: updatedOptions });
  };
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-dinput1"
        placeholder={`Select spot ${index + 1}...`}
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
}
export default CreatePollD;
