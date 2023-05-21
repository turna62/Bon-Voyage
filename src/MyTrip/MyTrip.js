import React from 'react';
import './mytrip.css';


class MyTrip extends React.Component{

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
<div class="mytrip">
            
            <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                        </li>
                      
                        <li class="nav-item">
                            <a class="nav-link page-scroll"  href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}><i class='fas fa-user-circle'></i> {this.state.userData.username}</a>
                        </li>
                       
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000/sign-in"><i class="fa fa-sign-out"></i> LOG OUT</a>
                        </li>
                        
                  </ul>

              </div>
         </nav> 
         <div>
         <h3 class="heading">Plan Your Next Trip</h3> <span></span>  </div>
         <div>
         <p class="inss">Press the 'Plan A Trip' button and start planning your next adventure with Bon Voyage.</p>   
         </div>
        
             <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-container">

                                    <a class="btn-solid-llg" href={`http://localhost:3000/planatrip?userId=${encodeURIComponent(this.state.userId)}`}>Plan A Trip</a>


                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>

                <img class="img-fluidi" src="/hills.jpg" alt=""/>

                

        </div>
        

        );
    }
}

export default MyTrip;