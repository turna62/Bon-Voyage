import React from 'react';
import './mytrip.css';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';

class MyItinerary extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userId: null,
          tripId: null,
          itineraryId: null,
          itineraryData:""
        
        };
      }

      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tripId = params.get('tripId');
        const itineraryId = params.get('itineraryId');
        console.log(userId); 
        
        console.log(tripId);
        this.setState({ userId: userId });
        this.setState({ tripId: tripId });
        this.setState({ itineraryId: itineraryId });
    
        
    fetch("http://localhost:5000/itineraryData",{
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type":"application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            //token: window.localStorage.getItem("token"),
            itineraryId: itineraryId,
        
        }),
    })
    .then((res) => res.json()) // convert data into JSON
    .then((data) => {
        console.log(data, "itineraryData");
        this.setState({itineraryData: data.data});
        if(data.data == 'Token Expired!'){
            alert("Token expired! Kindly login again."); 
            window.localStorage.clear();
            window.location.href = "./sign-in";
        }
    });

     

      }
    
    render(){
        //const {itineraryData} = this.state;

        return(
            <div >

         
<p> {this.state.itineraryData.destination}</p>
      
    
            </div>
        )

    }
}

export default MyItinerary;