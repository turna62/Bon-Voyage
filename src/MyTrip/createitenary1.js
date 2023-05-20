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



    export default class CreateItenerary1 extends React.Component {
      constructor(props) { 
        super(props);
        this.state = {
          
          userId: null, 
          tripId: null,
          tripData:"",
          userData:"",
          itineraryId: null,
          days: [
            {
              day: 2,
              description: '',
              activities: [],
              spots:[]
            },
          ],
        
        };
        this.setDays = this.setDays.bind(this);
      
        
        //this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }

      
      setDays(newDays) {
        this.setState({ days: newDays });
      }


      componentDidMount(){
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');
      const tripId = params.get('tripId');
      const itineraryId = params.get('itineraryId');
      console.log(userId); 
      console.log(tripId);
      console.log(itineraryId);
      this.setState({ userId: userId });
      this.setState({ tripId: tripId });
      this.setState({ itineraryId: itineraryId });
      


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

      handleSubmit(e){
        e.preventDefault();
        const { days, userId, tripId, itineraryId } = this.state;
        
        console.log(days, userId, tripId);

        const requestBody = {
          userId,
          tripId,
          itineraryId,
          days: days.map((day) => ({
            description: day.description,
            activities: day.activities,
            day: day.day,
            spots: day.spots
          }))
        };
        fetch("http://localhost:5000/newitinerary", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("userId") ,
          //  authorization: localStorage.getItem("email") ,
          },
          body: JSON.stringify(requestBody),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "itinerarySubmit");
            if (data.status === "OK!") {
                
                //alert('submitted Successfully!');
                window.localStorage.setItem('itineraryId', data.itineraryId);
                window.location.href = `http://localhost:3000/myitinerary1?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}&itineraryId=${data.itineraryId}`;

            } else {
              //alert(`went wrong: ${data.status}`);
            }
          })
          .catch((error) => {
            console.error(error); 
            //alert("Error! Something went wrong while calling the API.");
          });
      }

        

      handleNext= () =>{
            
        const { days, userId, tripId } = this.state;
        
        console.log(days, userId, tripId);

        const requestBody = {
          userId,
          tripId,
          days: days.map((day) => ({
            description: day.description,
            activities: day.activities,
            day: day.day,
            spots: day.spots
          }))
        };
        fetch("http://localhost:5000/itinerary", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("userId") ,
          //  authorization: localStorage.getItem("email") ,
          },
          body: JSON.stringify(requestBody),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "itinerarySubmit");
            if (data.status === "OK!") {
                
                //alert('submitted Successfully!');
                window.localStorage.setItem('itineraryId', data.itineraryId);
                window.location.href = `http://localhost:3000/createitenerary2?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}&itineraryId=${data.itineraryId}`;

            } else {
              //alert(`went wrong: ${data.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
            //alert("Error! Something went wrong while calling the API.");
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
                            <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}> <i class='fas fa-user-circle'></i> MY PROFILE</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro"><i class="fa fa-sign-out"></i> LOG OUT</a>
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
        <a class="btnaddmembers" href={`http://localhost:3000/addmembers?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>+ Add Members</a>

        <ul class="ul">
        <li class="li"> <a href={`http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Overview</a></li>
        <li class="li"> <a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Polls</a></li>
        <li class="li"> <a href={`http://localhost:3000/date?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Date</a></li>
        <li class="li"> <a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Destination</a></li>
        <li class="li"> <a href={`http://localhost:3000/route?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Route</a></li>
        <li class="ovwli"> <a href={`http://localhost:3000/itinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Itinerary</a></li>
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

<button class="pollbtn1" type="button" onClick={this.handleNext}>Next</button>

</div> 


<div class="icolumn">
<div class="irow">
<div class="icard">
<form  onSubmit = {this.handleSubmit}>

{/* {/* 
<div>
<label htmlFor="spots">Spots:</label>
<Map />
</div> */}

{this.state.days.map((day, index) => (
<div key={index}>
<p htmlFor={`day${index}`}><b>Day:&nbsp; </b>
<select
name={`day${index}`}
value={day.day !== null ? day.day.toString() : ""}
onChange={(e) => {
const newDays = [...this.state.days];
newDays[index].day = e.target.value !== "" ? parseInt(e.target.value) : null;
this.setState({ days: newDays });
}}
>
<option value="2">2</option>
<option value="3">3</option>

</select></p>

<p htmlFor="spots">Spots:</p>
<Map days={this.state.days} />

<p> Activities:</p>
<label className="aclabel">
<input
className="accinput"
type="checkbox"
name={`activities${index}`}
value="Paragliding"
onChange={(e) => {
  const { checked, value } = e.target;

  const updatedDays = [...this.state.days];
  const activities = checked
    ? [...updatedDays[index].activities, value]
    : updatedDays[index].activities.filter(
        (activity) => activity !== value
      );
  updatedDays[index] = { ...updatedDays[index], activities };

  this.setState({ days: updatedDays });
}}
/>
<span className="activitiespan">Paragliding</span>
</label>

<label className="aclabel">
<input
className="accinput"
type="checkbox"
name={`activities${index}`}
value="Hiking"
onChange={(e) => {
  const { checked, value } = e.target;

  const updatedDays = [...this.state.days];
  const activities = checked
    ? [...updatedDays[index].activities, value]
    : updatedDays[index].activities.filter(
        (activity) => activity !== value
      );
  updatedDays[index] = { ...updatedDays[index], activities };

  this.setState({ days: updatedDays });
}}
/>
<span className="activitiespan">Hiking</span>
</label>

<label className="aclabel">
<input
className="accinput"
type="checkbox"
name={`activities${index}`}
value="Boating"
onChange={(e) => {
  const { checked, value } = e.target;

  const updatedDays = [...this.state.days];
  const activities = checked
    ? [...updatedDays[index].activities, value]
    : updatedDays[index].activities.filter(
        (activity) => activity !== value
      );
  updatedDays[index] = { ...updatedDays[index], activities };

  this.setState({ days: updatedDays });
}}
/>
<span className="activitiespan">Boating</span>
</label>

<label className="aclabel">
<input
className="accinput"
type="checkbox"
name={`activities${index}`}
value="Cycling"
onChange={(e) => {
  const { checked, value } = e.target;

  const updatedDays = [...this.state.days];
  const activities = checked
    ? [...updatedDays[index].activities, value]
    : updatedDays[index].activities.filter(
        (activity) => activity !== value
      );
  updatedDays[index] = { ...updatedDays[index], activities };

  this.setState({ days: updatedDays });
}}
/>
<span className="activitiespan">Cycling</span>
</label>

<label className="aclabel">
<input
className="accinput"
type="checkbox"
name={`activities${index}`}
value="Horse Riding"
onChange={(e) => {
  const { checked, value } = e.target;

  const updatedDays = [...this.state.days];
  const activities = checked
    ? [...updatedDays[index].activities, value]
    : updatedDays[index].activities.filter(
        (activity) => activity !== value
      );
  updatedDays[index] = { ...updatedDays[index], activities };

  this.setState({ days: updatedDays });
}}
/>
<span className="activitiespan">Horse Riding</span>
</label>

<label className="aclabel">
<input
className="accinput"
type="checkbox"
name={`activities${index}`}
value="Wildlife Safari"
onChange={(e) => {
  const { checked, value } = e.target;

  const updatedDays = [...this.state.days];
  const activities = checked
    ? [...updatedDays[index].activities, value]
    : updatedDays[index].activities.filter(
        (activity) => activity !== value
      );
  updatedDays[index] = { ...updatedDays[index], activities };

  this.setState({ days: updatedDays });
}}
/>
<span className="activitiespan">Wildlife Safari</span>
</label>

<p className="descripfix">
Description:
<input
className="accinputt"
type="text"
name={`description${index}`}
placeholder="Description.."
value={day.description}
onInput={(e) => {
  const newDays = [...this.state.days];
  newDays[index].description = e.target.value;
  this.setState({ days: newDays });
}}
/>
</p>


</div>
))}



<input class="savedesbtn" type="submit" value="Save"/>
</form>
</div>

</div>



</div>




</div>
//AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo

</div>
            );

        }
      }
    
      function Map({days }) {
        const [selectedSpots, setSelectedSpots] = useState([]);
      
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
              className="combobox-input"
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
      