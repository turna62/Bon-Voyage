import React from 'react';
import './mytrip.css';
class Date extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userId: null,
          tripId: null,
          tripData:"",
          userData:"",
          startDate:null,
          endDate: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount() {
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
      }
      handleSubmit(e){
        e.preventDefault();
        console.log("Form submitted!"); 
        const { startDate, endDate, tripId} = this.state;
        
        console.log(startDate, endDate, tripId);
        fetch("http://localhost:5000/adddate", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("userId") ,
          //  authorization: localStorage.getItem("email") ,
          },
          body: JSON.stringify({
            startDate,
            endDate,
            tripId
            
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userSubmit");
            if (data.status === "OK!") {
                alert('Saved succesfully!');
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
    render(){
        return(
            <div class="deetailplan">
         <p>Set a starting and an ending date of your trip.</p> 
<form ref={form => this.form = form} onSubmit = {this.handleSubmit}>
                                     <p class="startdate">Start date: </p>       <input name="startDate" type="date" class="form-controll" id="inputCheckIn" placeholder="Start date"  onInput = {e=>this.setState({startDate:e.target.value})}/>
                                     <p class="enddate">End date: </p>       <input name="endDate" type="date" class="form-controll" id="inputCheckIn" placeholder="End date"  onInput = {e=>this.setState({endDate:e.target.value})}/>
                                <input class="btndate" type = "submit" value = "Set Date"/>             
                                </form>
    </div>
        )
    }
}
export default Date;