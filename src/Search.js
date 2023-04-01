import React, { useState } from "react";
import "./searchstyle.css";
import placesData from "./places_data.json";
import spotsData from "./spots_data.json";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredplacesData = placesData.filter(
      (val) =>
        val.place_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.place_category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredspotsData = spotsData.filter(
      (val) =>
        val.spot_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.spot_category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      <>

      <div class="sbody">

      <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
      <h3 class="logo">Bon VOYAGE!</h3>

                
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000">HOME <span class="sr-only">(current)</span></a>
                        </li>
        
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/sign-up">SIGN UP</a>
                            
                        </li>

                        
                  </ul>
                            
              </div>
         </nav> 

         <div className="templateContainer">
          <div className="searchInput_Container">
      

<div class="container mt-5">

        <div class="row d-flex justify-content-center">

          
                    <h5 class="shead">An Easier way to find your Destinations, Spots and Activities</h5>

                    <div class="row g-3 mt-2">

                        {/* <div class="col-md-3">

                            <div class="dropdown">
                              <button class="btn1 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                Any type
                              </button>
                              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#">Beach</a></li>
                                <li><a class="dropdown-item" href="#">Hills</a></li>
                                <li><a class="dropdown-item" href="#">All</a></li>
                              </ul>
                            </div>
                            
                        </div> */}

                        <div class="col-md-6">


                        <input
                class="form-control"
                id="searchInput"
                type="text"
                placeholder="Search places, spots"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />                            
                        </div>

                        <div class="col-md-3">

                            <button class="btns1">Search Results</button>
                            
                        </div>
                        
                    </div>

                    {searchTerm === "" ? (
            <div className="no_results_found"></div>
          ) : filteredplacesData.length > 0 ? (
            <div className="template_Container">
              {filteredplacesData.map((val) => {
                return (
                  <div className="template" key={val.place_id}>
                    <img
                      src={process.env.PUBLIC_URL + val.place_image}
                      alt=""
                    />
                    <h5>{val.place_name}</h5>
                    <p>{val.place_description}</p>
                  </div>
                );
              })}
            </div>
          ) : filteredspotsData.length > 0 ? (
            <div className="template_Container">
              {filteredspotsData.map((val) => {
                return (
                  <div className="template" key={val.spot_id}>
                    <img
                      src={process.env.PUBLIC_URL + val.spot_image}
                      alt=""
                    />
                    <h5>{val.spot_name}, {val.spot_place_name}</h5>
                    <p>{val.spot_description}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no_results_found">No results found.</div>
          )}




                    <div class="mt-3">
                        
  <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="advanced">
    Advance Search With Filters <i class="fa fa-angle-down"></i>
  </a>
 

<div class="collapse" id="collapseExample">
  <div class=" cardss card card-body">
      
     <div class="rown row">

        <div class="col-md-4">
                        <p class="filterhead">Location Type</p>
                         <select class="inputs form-control" id="exampleFormControlSelect1" placeholder="Search by Type">
                                        <option></option>
                                        <option>Hills</option>
                                        <option>Beach</option>
                                        <option>Countryside</option>
                         </select>            
        </div>


        <div class="col-md-4">
        <p class="filterhead">Spots</p>

        <select class="inputs form-control" id="exampleFormControlSelect1" placeholder="Search by Type">
                                        <option></option>
                                        <option>Inani</option>
                                        <option>Shugondha</option>
                                        <option>Kolatoli</option>
                         </select>

            {/* <input type="text" class="inputs form-control" placeholder="Search by Activities"/> */}
            
        </div>
         

         <div class="col-md-4">
         <p class="filterhead">Activities</p>

         <select class="inputs form-control" id="exampleFormControlSelect1" placeholder="Search by Type">
                                        <option></option>
                                        <option>Horse Riding</option>
                                        <option>Paragliding</option>
                                        <option>Bungee Jumping</option>
                                        <option>Hiking</option>
                         </select>

            {/* <input type="text" class="inputs form-control" placeholder="Search by District"/> */}
            
        </div>
         
     </div>

  </div>
</div>

                    </div>

            
                </div>
                
            </div>
            
        </div>

        
        


    </div>

    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4>Few Words About Bon Voyage!</h4>
                        <p class="white">We are passionate about helping you to arrange your trip as best as we can.</p></div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Links</h4>
                        <ul class="list-unstyled li-space-lg white">
                            <li>
                                <a class="white" href="#your-link">startupguide.com</a>
                            </li>
                            <li>
                                <a class="white" href="terms-conditions.html">Terms & Conditions</a>
                            </li>
                            <li>
                                <a class="white" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Tools</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">businessgrowth.com</a>
                            </li>
                            <li>
                               <a class="white" href="#your-link">influencers.com</a>
                            </li>
                            <li class="media">
                                <a class="white" href="#your-link">optimizer.net</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Partners</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">booking.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">trip.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">travel.com</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
            </div>
        </div> 
    </div> 
    

    </div>

     </>
  );
}

export default Search;  
