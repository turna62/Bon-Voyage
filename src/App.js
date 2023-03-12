import React, { useState } from "react";
import "./searchstyle.css";
import data from "./places_data.json";


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//  import UserProfile from "./user_creation/userProfile";

import SignUp from "./user_creation/signup";
import LogIn from "./user_creation/login";
import HomePage from "./Home/home";
import TripPlan from "./Home/PlanATrip";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter(
    (val) =>
      val.place_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.place_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
    </>
  );
}

function App() {
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={isLoggedIn == "true" ? <UserProfile /> : <Home />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/planatrip" element={<TripPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
