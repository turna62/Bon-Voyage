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
        this.updateAllIsRead = this.updateAllIsRead.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
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
    
      const {myPolls, destination} = this.state;

        return(
            <div class="deetailplan">

         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        

                        <a class="nav-link page-scroll">
  <button onClick={this.updateAllIsRead}>
    <span class="notif-icon">
      <i class="fas fa-bell"></i>
      {this.state.notifsData.filter(notif => !notif.isRead).length > 0 && (
        <span class="notif-count">
          {this.state.notifsData.filter(notif => !notif.isRead).length}
        </span>
      )}
    </span>
  </button>
</a> 
<div class="notifications-container">
  <ul>
    {this.state.notifsData.map((notif, index) => (
      <li key={index}>
        <p>{notif.message}</p>
        <p>{notif.createdAt}</p>
      </li>
    ))}
  </ul>
</div>
 
  
  
</li>
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
                                <h1>Let's Plan, {this.state.userData.username}!</h1>


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
        <li class="li"><a href={`http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Overview</a></li>
        <li class="li"><a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Polls</a></li>
        <li class="li"><a href={`http://localhost:3000/date?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Date</a></li>
        <li class="ovwli"><a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Destination</a></li>
        <li class="li"><a href={`http://localhost:3000/route?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Route</a></li>
        <li class="li"><a href={`http://localhost:3000/itinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Itinerary</a></li>
     </ul>     
     </div>     
     
     <div class="desbody">
     <div class="phead">  
         <h3>Let's fix destination</h3>
         <p>Search destinations and then select it by clicking on 'Select' button.</p> 
         <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
         < Map  />
         <input class="btndestination" type="submit" value="SELECT"/>
         </form>
    </div>
    <div class="pollaunch">
    <h3>Or Open voting</h3>
         <p>Launch poll to decide destinations through voting.</p> 
    </div>

    <div class="pollaunch1">
    <h3>Access poll here:</h3>
    </div>

    <div class="quespoll1">
      {myPolls.map((poll, index) => (
        <div key={poll._id}>
           
          <Link to={`/dlaunchpoll?pollId=${poll._id}&userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}className="no">{index + 1}.{poll.question}</Link>
          
        </div>
      ))}
    </div>

    <div class="dbtnfix">
    <input class="btndestination" type="submit" value="SELECT"/></div>

    <a class="btnopnvote" href={`http://localhost:3000/createpolldes?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Open Voting</a>

         <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4>Few Words About Bon Voyage!</h4>
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