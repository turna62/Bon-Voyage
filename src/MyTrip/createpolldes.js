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
      question:"Destination Poll",
      tripId: props.tripId,
      userId: props.userId,
      userData:""
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
  
  handleSubmit(e, isTripOwner) {
    e.preventDefault();
    const {options, tripId, userId, question } = this.state;
    console.log (tripId, userId, options, question);
  
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
        question
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       // console.log(data, "pollSubmit");
        if (data.error) {
           
          const errorContainer = document.getElementById('error-container1');
          errorContainer.innerHTML = `<div class="alert alert-danger custom-alert1" role = "alert" >${data.error}</div>`;
          this.form.reset(); 
        }
          
          else if (data.status === "OK!") {
            //alert("Poll created successfully!");
            console.log(tripId);
            window.location.href = `http://localhost:3000/destination?userId=${encodeURIComponent(
              this.state.userId
            )}&tripId=${encodeURIComponent(this.state.tripId)}`;
          } else {
            alert(`went wrong: ${data.status}`);
            this.form.reset();
          }
        })
      .catch((error) => {
        console.error(error);
        //alert("Error! Something went wrong while calling the API.");
      });
  }
 
  
  render() {
    return (
      <div className="deetailplan">
        <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
          <h3 className="logo"><i className="fa fa-anchor"></i> Bon VOYAGE!</h3>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span className="sr-only">(current)</span></a>
              </li>
            
              <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}> <i class='fas fa-user-circle'></i> <span class="username">{this.state.userData.username}</span>
</a> </li>
              <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/planatrip?userId=${encodeURIComponent(this.state.userId)}`}> <i class="fas fa-suitcase-rolling"></i> NEW TRIP</a>
                        </li>

              <li className="nav-item">
                <a className="nav-link page-scroll" href="http://localhost:3000/sign-in">LOG OUT</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mainn-w3layouts wrapper">
          <div className="mainn-agileinfo">
            <div className="agileitss-top">
              <h3 className="cpoll">Create Poll</h3><hr></hr>
              <h5 className="ccpoll1">Add up to four places to create a poll and vote to finalize the destination.</h5>
              <form  onSubmit={(e) => this.handleSubmit(e, this.props.isTripOwner)}>
                <h5 className="ccpll1">Add up to 04 places:</h5>
                <Map options={this.state.options} setOptions={this.setOptions} />    
                <div id="error-container1"></div>     
                <input className="btncdestination" type="submit" value="LAUNCH POLL" />
                
              </form>
           
              <p className="back">
             
                <a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>
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

function Map({options, setOptions  }) {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleSelect = (option, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = option.address;
    setOptions(updatedOptions); // Use setOptions function passed as a prop
  };

  
  return (
    <>
      <div className="places-container">
      <div className="spot-input">
       <PlacesAutocomplete onSelect={handleSelect} index={0} />
       </div>
        <div className="spot-input">
       <PlacesAutocomplete onSelect={handleSelect} index={1}   />
      </div>
       <div className="spot-input">
           <PlacesAutocomplete onSelect={handleSelect} index={2} />
           </div>
         <div className="spot-input">
   <PlacesAutocomplete onSelect={handleSelect} index={3}  />
       </div>

</div>
    </>
  );
}

const PlacesAutocomplete = ({ onSelect, index, options, setOptions }) => {
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

   onSelect({ address, lat, lng }, index);
    const updatedOptions = [...options];
    updatedOptions[index] = address;
    setOptions(updatedOptions); 
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
