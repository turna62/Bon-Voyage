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
      <div class="scbody">

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
            
            <form class="search" action="">
              <input
                class="searchi"
                id="searchInput"
                type="text"
                placeholder="Search places, spots"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button type="submit">Search</button>
            </form>
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
        </div>
      </div>
    </>
  );
}

export default Search;