import React, { Component } from "react";

export default class UserProfile extends Component{

    state = {
    userId: '',
    myTrips: [],
    joinedTrips: []
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    
    console.log(userId);
    this.setState({ userId: userId });
    
    fetch("http://localhost:5000/trips",{
      method: "POST",
      crossDomain: true,
      headers:{
          "Content-Type":"application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    .then((res) => res.json()) // convert data into JSON
    .then((data) => {
      console.log(data, 'trips');
      if (data.status === 'OK!') {
        this.setState({ myTrips: data.trips });
      } else {
        alert('Error! Something went wrong!');
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while retrieving");
    });
  
    fetch("http://localhost:5000/joinedtrips",{
      method: "POST",
      crossDomain: true,
      headers:{
          "Content-Type":"application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    .then((res) => res.json()) // convert data into JSON
    .then((data) => {
      console.log(data, 'joined trips');
      if (data.status === 'OK!') {
        this.setState({ joinedTrips: data.trips });
      } else {
        alert('Error! Something went wrong!');
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while retrieving");
    });
  }


constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userData:""
    };
  }

componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    
    console.log(userId);
    this.setState({ userId: userId });
    

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

            <body class="profilebody">
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
                        
                  </ul>

              </div>
         </nav>

         

         <div class="containerr mt-4 mb-4 p-3 d-flex justify-content-center">
             <div class="card p-4"> 
                 <div class=" image d-flex flex-column justify-content-center align-items-center"> 
                   
                     <span class="name mt-3">{this.state.userData.username}</span> 
                     <span class="idd">{this.state.userData.email}</span> 
                                     
                    <p> <a class="btn1">Edit Profile</a>  
                     <a class="btn1" href={`http://localhost:3000/tripsection?userId=${encodeURIComponent(this.state.userId)}`}>My Trips</a>    </p>                      
                        
                         
                   </div> 
                </div>
              </div>  


              

    </div>

    </body>

        );
    }
}