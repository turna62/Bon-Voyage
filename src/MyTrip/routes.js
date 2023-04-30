import './mytrip.css';
import React, { useState } from "react";
import axios from "axios";

function Road() {

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [route, setRoute] = useState([]);
  
    const API_KEY = "AIzaSyAz2_MkHBuMmmgsKwwVnp1tF-qOVm0B9Oo";
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:3000/api/maps/api/directions/json?origin=${start}&destination=${end}&key=${API_KEY}`);
        setRoute(response.data.routes[0].legs[0].steps);
      };
      
    return (
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
        <li class="li"><a href="http://localhost:3000/overview">Overview</a></li>
        <li class="li"><a href="http://localhost:3000/polls">Polls</a></li>
        <li class="li"><a href="http://localhost:3000/date">Date</a></li>
        <li class="li"><a href="http://localhost:3000/destination">Destination</a></li>
        <li class="li"><a href="http://localhost:3000/activities">Activities</a></li>
        <li class="ovwli"><a href="http://localhost:3000/route">Route</a></li>
        <li class="li"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
     </ul>
    
    </div>            
        
    <div>
       <form class="route" onSubmit={handleSubmit}>
         <label>
           Start:
           <input type="text" value={start} onChange={(e) => setStart(e.target.value)} />
         </label>
         <label>
           End:
           <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} />
         </label>
         <button class="btnroute" type="submit">Get Route</button>
       </form>
       {route.map((step) => (
         <p>{step.html_instructions}</p>
       ))}
     </div>

     <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4></h4>
                        <p class="white"></p>
                    </div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Help</h4>
                        <ul class="list-unstyled li-space-lg white">
                           <li>

                           </li>
                        </ul>
                    </div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Social Media</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                
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
  
  export default Road;