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
      days: [],
    };
  }

  handleSelect = (spot, index) => {
    const { days } = this.state;
    const updatedDays = [...days];
    updatedDays[0].spots[index] = spot.address; // Assuming you always update the spots for the first day
    this.setState({ days: updatedDays });
  };

  render() {
    return (
      <div className="deetailplan">
        <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
          <h3 className="logo"><i className="fa fa-anchor"></i> Bon VOYAGE!</h3>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="http://localhost:3000">HOME <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#intro">LOG OUT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="http://localhost:3000/myprofile">MY PROFILE</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mainn-w3layouts wrapper">
          <div className="mainn-agileinfo">
            <div className="agileitss-top">
              <h3 className="cpoll">Create Poll</h3><hr></hr>
              <h5 className="ccpoll1">Add up to five places to create a poll and vote to finalize the destination.</h5>
              <form>
                <h5 className="ccpll1">Add up to 05 places:</h5>
                <Map handleSelect={this.handleSelect} days={this.state.days} />
                <input className="btncdestination" type="submit" value="LAUNCH POLL" />
              </form>
              <p className="back">
                <a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>
                  <u>Back</u>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="text-container about">
                  <h4>Few Words About Bon Vogage!</h4>
                  <p className="white">We are passionate about helping you arrange your trip as best as we can.</p>
                </div>
              </div>
              <div className="col-md-2">
                <div className="text-container">
                  <h4>Links</h4>
                  <ul className="list-unstyled li-space-lg white">
                    <li>
                      <a className="white" href="#your-link">startupguide.com</a>
                    </li>
                    <li>
                      <a className="white" href="terms-conditions.html">Terms & Conditions</a>
                    </li>
                    <li>
                      <a className="white" href="privacy-policy.html">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="text-container">
                  <h4>Tools</h4>
                  <ul className="list-unstyled li-space-lg">
                    <li>
                      <a className="white" href="#your-link">businessgrowth.com</a>
                    </li>
                    <li>
                      <a className="white" href="#your-link">influencers.com</a>
                    </li>
                    <li className="media">
                      <a className="white" href="#your-link">optimizer.net</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="text-container">
                  <h4>Partners</h4>
                  <ul className="list-unstyled li-space-lg">
                    <li>
                      <a className="white" href="#your-link">unicorns.com</a>
                    </li>
                    <li>
                      <a className="white" href="#your-link">staffmanager.com</a>
                    </li>
                    <li>
                      <a className="white" href="#your-link">association.gov</a>
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

function Map({days }) {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  

  const handleSelect = (spot, index) => {
    const updatedDays = [...days];
    updatedDays[0].spots[index] = spot.address; // Assuming you always update the spots for the first day
    this.state.setDays(updatedDays);
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
       <div className="spot-input">
           <PlacesAutocomplete onSelect={handleSelect} index={2} />
           </div>
         <div className="spot-input">
   <PlacesAutocomplete onSelect={handleSelect} index={3} />
       </div>

</div>
    </>
  );
}

const PlacesAutocomplete = ({ onSelect, index, days }) => {
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

    const updatedDays = [...days];
updatedDays[0].spots[index] = address;
this.state.setDays(updatedDays);
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
