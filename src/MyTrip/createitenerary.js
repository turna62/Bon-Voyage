import React, { Component, useState, useEffect } from 'react';
import './mytrip.css';
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

const useGoogleMapsLoadScript = (libraries) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo&libraries=${libraries.join(',')}`;
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [libraries]);

  return isLoaded;
};

class CreateItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setSelected: null
    };
  }

  Map = () => {
    const { setSelected } = this.state;

    return (
      <>
        <div className="places-container">
          <PlacesAutocomplete setSelected={setSelected} />
        </div>
      </>
    );
  };

  render() {
   
    return (
      <div className="deetailplan">
        <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
          <h3 className="logo">Bon VOYAGE!</h3>
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

        <header id="header" className="headerr">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-container">
                    <h1>Let's Plan,!</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div>
          <h4 className="tripname">trip name</h4>
          <hr></hr>
          <a className="btnaddmembers" href="http://localhost:3000/addmembers">+ Add Members</a>
          <ul className="ul">
            <li className="li"><a href="http://localhost:3000/overview">Overview</a></li>
            <li className="li"><a href="http://localhost:3000/polls">Polls</a></li>
            <li className="li"><a href="http://localhost:3000/date">Date</a></li>
            <li className="li"><a href="http://localhost:3000/destination">Destination</a></li>
            <li className="li"><a href="http://localhost:3000/route">Route</a></li>
            <li className="ovwli"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
          </ul>
        </div>
        <div className="ibody">
          <div className="pheadd">
            <h3>Itinerary</h3>
            <p>Add your preferred activities, location and build your suitable itinerary.</p>
          </div>
          <div className="pheadd1">
            <h3>Preview Itinerary:</h3>
            <p>Click on the 'View' button to see your itinerary.</p>
            <a className="btnit" href={`http://localhost:3000/myitinerary`}>View</a>
          </div>
          <div className="icolumn">
            <div className="irow">
              <div className="icard">
                <h3>Day 1</h3>
                <p>Spot: <this.Map /></p>
                <p>Activities: </p>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Paragliding</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Hiking</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Boating</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Cycling</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Horse Riding</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Wildlife Safari</span>
                </label>
                <p className="descripfix">Description: <input className="accinputt" type="text" id="fname" name="description" placeholder="Description.." /></p>
              </div>
            </div>

            <div className="irow">
              <div className="icard">
                <h3>Day 2</h3>
                <p>Spot: <this.Map /></p>
                <p>Activities: </p>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Paragliding</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Hiking</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Boating</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Cycling</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Horse Riding</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Wildlife Safari</span>
                </label>
                <p className="descripfix">Description: <input className="accinputt" type="text" id="fname" name="description" placeholder="Description.." /></p>
              </div>
            </div>

            <div className="irow">
              <div className="icard">
                <h3>Day 3</h3>
                <p>Spot: <this.Map /></p>
                <p>Activities: </p>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Paragliding</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Hiking</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Boating</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Cycling</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Horse Riding</span>
                </label>
                <label className="aclabel">
                  <input className="accinput" type="checkbox" name="checkbox4" />
                  <span className="activitiespan">Wildlife Safari</span>
                </label>
                <p className="descripfix">Description: <input className="accinputt" type="text" id="fname" name="description" placeholder="Description.." /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="footerbody"></div>
      </div>
    );
  }
}

class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      value: "",
      suggestions: { status: null, data: [] },
    };
  }

  handleSelect = async (address) => {
    const { setValue, clearSuggestions, setSelected } = this.props;
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  handleChange = (e) => {
    const { setValue } = this.props;
    setValue(e.target.value);
  };

  render() {
    const { ready, value, suggestions } = this.state;

    return (
      <Combobox onSelect={this.handleSelect}>
        <ComboboxInput
          value={value}
          onChange={this.handleChange}
          disabled={!ready}
          className="combobox-iinput"
          placeholder="Select a spot.."
        />
        <ComboboxPopover>
          <ComboboxList>
            {suggestions.status === "OK" &&
              suggestions.data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  }
}

export default CreateItinerary;
