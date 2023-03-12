import React from 'react';
import './mytrip.css';


class Mytrip extends React.Component{
    render(){

        return(
<div class="mytrip">
            
            <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo">Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#header">HOME <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro">INTRO</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#services">SERVICES</a>
                        </li>
                        
        
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/sign-up">SIGN UP</a>
                            
                        </li>

                        <li class="nav-item-search">
                          
                        <a class="nav-link" href="http://localhost:3000/search">SEARCH</a>
 
                    
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

                <img class="img-fluid" src="MyTrip/hills.jpg" alt="alternative"/>

        </div>
        

        );
    }
}

export default Mytrip;