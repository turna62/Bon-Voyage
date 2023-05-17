import React from 'react';
import './mytrip.css';
import { useState} from "react";
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

export default function CreatePollD() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo",
        libraries: ["places"],
      });

      if (!isLoaded) return <div>Loading...</div>;   

        return(
            <div class="deetailplan">

         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo">Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000">HOME <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro">LOG OUT</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000/myprofile">MY PROFILE</a>
                        </li>
                       
                        
                  </ul>

              </div>
         </nav>

    <div class="mainn-w3layouts wrapper">
		<div class="mainn-agileinfo">
			<div class="agileitss-top">
            <h3 class="cpoll">Create Poll</h3><hr></hr>
            <h5 class="ccpoll1">Add upto five places to create poll and vote to finalise destination.</h5>
				<form>
                   <h5 class="ccpll1">Add up to 05 places:</h5>

                   {/* <input class="textt" type="text" name="option1" placeholder="Answer 1" required="" onInput={e => this.setState({options: { ...this.state.options, 0: e.target.value }})} />
                  <input class="textt" type="text" name="option2" placeholder="Answer 2" required="" onInput={e => this.setState({options: { ...this.state.options, 1: e.target.value }})} />
                   <input class="textt" type="text" name="option3" placeholder="Answer 3" required="" onInput={e => this.setState({options: { ...this.state.options, 2: e.target.value }})} />
                      <input class="textt" type="text" name="option4" placeholder="Answer 4" required="" onInput={e => this.setState({options: { ...this.state.options, 3: e.target.value }})} />
                      <input class="textt" type="text" name="option5" placeholder="Answer 5" required="" onInput={e => this.setState({options: { ...this.state.options, 4: e.target.value }})} /> */}


                    {/* <a class="btncreatepoll" href="http://localhost:3000/launchpoll1">LAUNCH POLL</a> */}

                    <Map/>
                    <input class="btncdestination" type="submit" value="LAUNCH POLL"/>

				</form>

				<p class="back"><a href="http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}"><u>Back</u> </a></p>
			</div>
		</div>
    </div>

         <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4>Few Words About Bon Vogage!</h4>
                        <p class="white">We are passionate about helping you to arrange your trip as best as we can.</p></div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Links</h4>
                        <ul class="list-unstyled li-space-lg white">
                            <li>
                                <a class="white" href="#your-link">startupguide.com</a>
                            </li>
                            <li>
                                <a class="white" href="terms-conditions.html">Terms & Conditions</a>
                            </li>
                            <li>
                                <a class="white" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Tools</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">businessgrowth.com</a>
                            </li>
                            <li>
                               <a class="white" href="#your-link">influencers.com</a>
                            </li>
                            <li class="media">
                                <a class="white" href="#your-link">optimizer.net</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Partners</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">unicorns.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">staffmanager.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">association.gov</a>
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
function Map() {
    const [selectedSpots, setSelectedSpots] = useState(Array(5).fill(null));
  
    const handleSelect = (index, spot) => {
      const newSelectedSpots = [...selectedSpots];
      newSelectedSpots[index] = spot;
      setSelectedSpots(newSelectedSpots);
    };
  
    return (
      <>
        {Array(5)
          .fill()
          .map((_, index) => (
            <div key={index} className="placesF-container">
              <PlacesAutocomplete
                setSelected={(spot) => handleSelect(index, spot)}
                value={selectedSpots[index]}
              />
            </div>
          ))}
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
          className="combobox-dinput"
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

  