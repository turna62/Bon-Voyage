import React from 'react';
import { useState} from "react";
import {useLoadScript } from "@react-google-maps/api";
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



    export default class CreateItenerary3 extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          
          userId: null, 
          tripId: null,
          tripData:"",
          userData:""
          
        };
        //this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }

      componentDidMount(){
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');
      const tripId = params.get('tripId');
      
      console.log(userId); 
      console.log(tripId);
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
     
      }

        
          
        render(){
                return(
                    <div class="deetailplan">
 
         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
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
                                    <h1 ><div class="lets">Let's Plan,</div><div class="js-rotating"> {this.state.userData.username}!</div></h1>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 
     <div>

        <h4 class="tripname">{this.state.tripData.tripName}</h4><hr></hr>
        <a class="btnaddmembers" href="http://localhost:3000/addmembers">+ Add Members</a>
        <ul class="ul">
        <li class="li"><a href="http://localhost:3000/overview">Overview</a></li>
        <li class="li"><a href="http://localhost:3000/polls">Polls</a></li>
        <li class="li"><a href="http://localhost:3000/date">Date</a></li>
        <li class="li"><a href="http://localhost:3000/destination">Destination</a></li>
        <li class="li"><a href="http://localhost:3000/route">Route</a></li>
        <li class="ovwli"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
     </ul>
   
     </div>

     

     <div class="ibody">

     <div class="pheadd">
    <h3>Itinerary</h3>
<p>Add your preffered activities, location and build your suitable itinerary.</p> 

</div>  
<div class="pheadd1">
<h3>Add Next</h3>
<p>Click on the 'Save' button to save the itinerary or click 'Next' button to add information of next days.</p> 

<a class="btnit" href={`http://localhost:3000/createitenerary`}>Next</a>
<a class="btnit" href={`http://localhost:3000/itinerary`}>Submit</a>

</div> 


     <div class="icolumn">
  <div class="irow">
  <div class="icard">
    <h5> Day:</h5> <h6>
<div class="dropdown">
  <span> Select Days</span>
  <select class="dropdown-content" name="days" id="days">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>  
</div></h6>
      <p>Spot:<Map/></p>
      <p>Activities: </p>
      <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Paragliding</span>
      </label>
      <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Hiking</span></label>
      <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Boating</span></label>
      <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Cycling</span></label>
      <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Horse Riding</span></label>
      <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Wildlife Safari</span></label>
      <p class="descripfix">Description: <input class="accinputt" type="text" id="fname" name="description" placeholder="Description.."/></p>
    </div>
  </div>

  <input class="savedesbtn" type="submit" value="Save"/>
  
</div>
 


</div>

     
     </div>
                    );

                }
              }
            
              function Map() {
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