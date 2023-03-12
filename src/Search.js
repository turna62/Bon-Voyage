import "./searchstyle.css";
//import "./Home/HomeCss/styles.css";
import data from "./places_data.json";
import React, { useState } from "react";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = data.filter(
      (val) =>
        val.place_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.place_category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <>
      <div class="scbody">

      <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                
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
            
            <form class="search" action="">
                     <input class="searchi" id="searchInput" type="text" placeholder="Search places..." onChange={(event) => {setSearchTerm(event.target.value);}}/>
                     <button type="submit">Search</button>
            </form>   
          </div>
          {searchTerm === "" ? (
            <div className="no_results_found"></div>
          ) : filteredData.length > 0 ? (
            <div className="template_Container">
              {filteredData.map((val) => {
                return (
                  <div className="template" key={val.place_id}>
                    <img src={process.env.PUBLIC_URL + val.place_image} alt="" />
                    <h5>{val.place_name}</h5>
                    <p>{val.place_description}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no_results_found">No results found.</div>
          )}
        </div>
        </div>
      </>
    );
  }
  export default Search;