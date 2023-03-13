import React from 'react';
import './mytrip.css';


class MyTrip extends React.Component{
    render(){

        return(
<div class="mytrip">
            
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
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/sign-in">RESET PASSWORD</a>
                            
                        </li>
        
                        
                  </ul>

              </div>
         </nav> 
         <h3 class="heading">My Trips</h3>   
         <p class="ins">Press the 'Plan Your Trip' button and start planning your next adventure with Bon Voyage.</p>   
        
             <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-container">

                                    <a class="btn-solid-lg page-scroll" href="http://localhost:3000/planatrip">Plan A Trip</a>


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