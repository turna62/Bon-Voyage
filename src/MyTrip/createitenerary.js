import React from 'react';
import { useParams, Link } from "react-router-dom";
import './mytrip.css';


class CreateItenerary extends React.Component{
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
                                <h1>Let's Plan,!</h1>

                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 
     <div>

        <h4 class="tripname">trip name</h4><hr></hr>
        <a class="btnaddmembers" href="http://localhost:3000/addmembers">+ Add Members</a>
        <ul class="ul">
        <li class="li"><a href="http://localhost:3000/overview">Overview</a></li>
        <li class="li"><a href="http://localhost:3000/polls">Polls</a></li>
        <li class="li"><a href="http://localhost:3000/date">Date</a></li>
        <li class="li"><a href="http://localhost:3000/destination">Destination</a></li>
        <li class="li"><a href="http://localhost:3000/activities">Activities</a></li>
        <li class="li"><a href="http://localhost:3000/route">Route</a></li>
        <li class="ovwli"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
     </ul>

        
     </div>

     <div class="ibody">

     <div class="icolumn">
  <div class="irow">
    <div class="icard">
      <h3>Card 1</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>

  <div class="irow">
    <div class="icard">
      <h3>Card 2</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>
  
  <div class="irow">
    <div class="icard">
      <h3>Card 3</h3>
      <p>Some text</p>
      <p>Some text</p>
    </div>
  </div>

</div>

</div>
     
     </div>
                    )

                }
            }
            
            export default CreateItenerary;