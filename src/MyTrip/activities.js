import React from 'react';
import './mytrip.css';


class Activities extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tripId: null,
          userId: null,
          userData:""
        };
      } 
    
      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tripId = params.get('tripId');
        console.log(userId, tripId);
        this.setState({ userId: userId });
        this.setState({ tripId: tripId });

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
                                <h1 style={{ backgroundColor: this.state.userData.color }}>Let's Plan, {this.state.userData.username}!</h1>
                                    {/* <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p> */}


                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 


     <div>

        <h4 class="tripname">Trip Name</h4><hr></hr>
        <a class="btnaddmembers" href="http://localhost:3000/addmembers">+ Add Members</a>

        <ul class="ul">
        <li class="li"> <a href={`http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Overview</a></li>
        <li class="li"> <a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Polls</a></li>
        <li class="li"> <a href={`http://localhost:3000/date?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Date</a></li>
        <li class="li"> <a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Destination</a></li>
        <li class="ovwli"> <a href={`http://localhost:3000/activities?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Activities</a></li>
        <li class="li"> <a href={`http://localhost:3000/route?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Route</a></li>
        <li class="li"> <a href={`http://localhost:3000/itinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Itinerary</a></li>
     </ul>
     </div>   

     <div class="actbody">  
     <div class="accontainer">
	<form class="activitiesform"> 
    <p class="acthead">Select your favourite activities from here and keep planning</p>
		<label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox1" checked/>
			<span class="activitiespan">Paragliding</span>
		</label>
		<label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox2"/>
			<span class="activitiespan">Hiking</span> 
		</label>
		<label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox3"/>
			<span class="activitiespan">Swimming</span>
		</label>
        <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox4"/>
			<span class="activitiespan">Cycling</span>
		</label>
        <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox5"/> 
			<span class="activitiespan">Wild Life Safari</span>
		</label>
        <label class="aclabel">
			<input class="accinput" type="checkbox" name="checkbox6"/>
			<span class="activitiespan">Horse Riding</span>
		</label>
	</form>
</div>       <a class="btnact" href="http://localhost:3000/itinerary">Submit</a>
 
</div>   

            </div>
        )

    }
}

export default Activities;