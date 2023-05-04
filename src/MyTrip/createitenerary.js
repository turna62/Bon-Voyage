import React from 'react';
import { useState} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
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



    export default function CreateItenerary() {
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

         <header id="header" class="headerr">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-container">
                                <h1>Let's Plan,!</h1>

                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 
     <div>

        <h4 class="tripname">trip name</h4><hr></hr>
        <a class="btnaddmembers" href="http://localhost:3000/addmembers">+ Add Members</a>
        <ul class="ul">
        <li class="li"><a href="http://localhost:3000/overview">Overview</a></li>
        <li class="li"><a href="http://localhost:3000/polls">Polls</a></li>
        <li class="li"><a href="http://localhost:3000/date">Date</a></li>
        <li class="li"><a href="http://localhost:3000/destination">Destination</a></li>
        <li class="li"><a href="http://localhost:3000/activities">Activities</a></li>
        <li class="li"><a href="http://localhost:3000/route">Route</a></li>
        <li class="ovwli"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
     </ul>
   
     </div>

     <div class="pheadd">
    <h3>Itinerary</h3>
<p>Add your preffered activities, location and build your suitable itinerary.</p> 

</div> 


     <div class="ibody">

     <div class="icolumn">
  <div class="irow">
    <div class="icard">
      <h3>Day 1</h3>
      <p>Spot:<Map/>
</p>
      <p>Activities:</p>
    </div>
  </div>

  <div class="irow">
    <div class="icard">
      <h3>Day 2</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>
  
  <div class="irow">
    <div class="icard">
      <h3>Day 3</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
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
                    const [setSelected] = useState(null);
                  
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
                      className="combobox-iinput"
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