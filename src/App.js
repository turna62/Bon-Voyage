import React, { useState } from "react";

import Search from "./Search";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//  import UserProfile from "./user_creation/userProfile";

import SignUp from "./user_creation/signup";
import LogIn from "./user_creation/login";
import HomePage from "./Home/home";
import TripPlan from "./Home/PlanATrip";



function App() {
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={isLoggedIn == "true" ? <UserProfile /> : <Home />} /> */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/planatrip" element={<TripPlan />} />
      </Routes>
    </Router>
  );
}

export default App;