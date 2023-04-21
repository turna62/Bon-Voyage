import React, { useState } from "react";


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserProfile from "./user_creation/userProfile";
import Reset from "./user_creation/reset";
import SignUp from "./user_creation/signup";
import LogIn from "./user_creation/login";
import HomePage from "./Home/home";
import TripPlan from "./MyTrip/PlanATrip";
import MyTrip from "./MyTrip/MyTrip";
import DetailTripPlan from "./MyTrip/detailtripplan";
import Overview from "./MyTrip/Overview";
import Polls from "./MyTrip/polls";
import Date from "./MyTrip/date";
import Destination from "./MyTrip/destination";
import Activities from "./MyTrip/activities";
import Itinerary from "./MyTrip/itinerary";
import CreatePoll from "./MyTrip/createpoll";
import AddDestination from "./MyTrip/adddestination";
import Destination2 from "./MyTrip/destination2";
import AddMembers from "./MyTrip/addmembers";
import FetchedDestination from "./MyTrip/fetchedDestination";
import Search from "./Search";
import LaunchPoll from "./Poll/launchpoll";
import DemoPoll from "./DemoPoll";


function App() {
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userId = localStorage.getItem("userId");
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={isLoggedIn == "true" ? <UserProfile /> : <Home />} /> */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/planatrip" element={<TripPlan userId={userId} />} />
        <Route path="/mytrip" element={<MyTrip />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/detailtripplan" element={<DetailTripPlan />} />
        <Route path="/overview" element={<Overview/>} />
        <Route path="/polls" element={<Polls/>} />
        <Route path="/date" element={<Date/>} />
        <Route path="/destination" element={<Destination/>} />
        <Route path="/destination2" element={<Destination2/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/itinerary" element={<Itinerary/>} />
        <Route path="/createpoll" element={<CreatePoll/>} />
        <Route path="/adddestination" element={<AddDestination/>} />
        <Route path="/addmembers" element={<AddMembers/>} />
        <Route path="/launchpoll" element={<LaunchPoll/>} />
        {/* <Route path = "/fetcheddestination" element = {<FetchedDestination/>}/> */}
        <Route path = "/fetcheddestination" element = {<FetchedDestination/>}/>
        <Route path = "/demopoll" element = {<DemoPoll/>}/>
         
      </Routes>
    </Router>
  );
}

export default App;