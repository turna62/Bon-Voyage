import React, { useState } from "react";
import "./searchstyle1.css";
import placesData from "./places_data.json";
import spotsData from "./spots_data.json";

function Search1() {
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

<div class="container mt-5">

        <div class="row d-flex justify-content-center">

            <div class="">

                <div class="">

                    <h5>An Easier way to find your Destinations, Spots and Activities</h5>

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

                            <input type="text" class="form-control" placeholder="Enter address e.g. street, city and state or zip"/>
                            
                        </div>

                        <div class="col-md-3">

                            <button class="btns1">Search Results</button>
                            
                        </div>
                        
                    </div>


                    <div class="mt-3">
                        
  <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="advanced">
    Advance Search With Filters <i class="fa fa-angle-down"></i>
  </a>
 

<div class="collapse" id="collapseExample">
  <div class=" cardss card card-body">
      
     <div class="rown row">

        <div class="col-md-4">

            <input type="text" placeholder="Property ID" class="inputs form-control"/>
            
        </div>


        <div class="col-md-4">

            <input type="text" class="inputs form-control" placeholder="Search by MAP"/>
            
        </div>
         

         <div class="col-md-4">

            <input type="text" class="inputs form-control" placeholder="Search by Country"/>
            
        </div>
         
     </div>

  </div>
</div>


                    </div>


                    


            
                </div>
                
            </div>
            
        </div>

        
        


    </div>

    </div>

     </>
  );
}

export default Search1;  
