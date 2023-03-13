import React, { useState } from "react";


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Search from "./Search";
import UserProfile from "./user_creation/userProfile";
import Reset from "./user_creation/reset";
import SignUp from "./user_creation/signup";
import LogIn from "./user_creation/login";
import HomePage from "./Home/home";
import TripPlan from "./MyTrip/PlanATrip";
import MyTrip from "./MyTrip/MyTrip";
import DetailTripPlan from "./MyTrip/detailtripplan";
import Overview from "./MyTrip/Overview";



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
        <Route path="/mytrip" element={<MyTrip />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/detailtripplan" element={<DetailTripPlan />} />
        <Route path="/overview" element={<Overview/>} />
      </Routes>
    </Router>
  );
}

export default App;