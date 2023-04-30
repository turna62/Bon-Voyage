import React from 'react';
import './mytrip.css';


class MyTrip extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          userId: null
        };
      }
    
      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        this.setState({ userId: userId });
      }

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
                            <a class="nav-link page-scroll"  href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}>MY PROFILE</a>
                        </li>
                       
                        <li class="nav-item">
                            <a class="nav-link" href={`http://localhost:3000/tripsection?userId=${encodeURIComponent(this.state.userId)}`}>MY TRIPS</a>
                            
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/reset">RESET PASSWORD</a>
                            
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro">LOG OUT</a>
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