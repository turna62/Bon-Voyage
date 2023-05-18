import React, { Component } from "react";
import '../MyTrip/mytrip.css';
 //import '../Home/HomeCss/styles.css';
import './ucstyles.css';

export default class UserProfile extends Component{

    
    
constructor(props) {
  super(props);
  this.state = {
    userId: null,
    userData:"",
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

  render() {
    return (
      <body className="profilebody">
        <div className="deetailplan">
          <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
            <h3 className="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="http://localhost:3000">
                    HOME <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#intro">
                    LOG OUT
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
  
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          <div className="card p-4">
            <div className="image d-flex flex-column justify-content-center align-items-center">
              <span className="name mt-3">Name: {this.state.userData.username}</span>
              <span className="idd">Email: {this.state.userData.email}</span>
  
             <span>   <a href="" className="btn1">
                  Edit Profile
                </a>
                <a
                  className="btn1"
                  href={`http://localhost:3000/tripsection?userId=${encodeURIComponent(this.state.userId)}`}
                >
                  My Trips
                </a> </span>
            </div>
          </div>
        </div>
      </body>
    );
  }
  
}