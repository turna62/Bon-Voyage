import "./searchstyle.css";
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
      <body class="sbody">
        <div className="templateContainer">
          <div className="searchInput_Container">
            
            <form class="search" action="">
                     <input class="searchi" id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {setSearchTerm(event.target.value);}}/>
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
        </body>
      </>
    );
  }
  export default Search;