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
import CreatePollD from "./MyTrip/createpolldes";
import AddDestination from "./MyTrip/adddestination";
import Destination2 from "./MyTrip/destination2";
import AddMembers from "./MyTrip/addmembers";
import FetchedDestination from "./MyTrip/fetchedDestination";
import Search from "./Search";
import LaunchPoll from "./Poll/launchpoll";
import DemoPoll from "./DemoPoll";
import LaunchPoll1 from "./MyTrip/launchpoll1";
import TripInvitation from "./MyTrip/TripInvitation";
import Places from "./MyTrip/routes";
import Places1 from "./MyTrip/routes";
import TripSection from "./MyTrip/TripSection";
import MyItinerary from "./MyTrip/myItinerary";
import CreateItenerary from "./MyTrip/createitenerary";
import CreateItenerary1 from "./MyTrip/createitenary1";
import CreateItenerary2 from "./MyTrip/createitenerary2";
import CreateItenerary3 from "./MyTrip/createitenerary3";
import MyItinerary1 from "./MyTrip/myItinerary1";
import PollResult from "./MyTrip/pollresult";
import DLaunchPoll from "./MyTrip/dlaunchpoll";
import DPollResult from "./MyTrip/dpollresult";
import CreatePollDate from "./MyTrip/createpolldate";

function App() {
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userId = localStorage.getItem("userId");
  const tripId = localStorage.getItem("tripId");
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
        <Route path="/myprofile" element={<UserProfile  />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/detailtripplan" element={<DetailTripPlan />} />
        <Route path="/overview"  element={<Overview userId={userId} tripId={tripId} />} />
        <Route path="/polls" element={<Polls/>} />
        <Route path="/date" element={<Date/>} />
        <Route path="/destination" element={<Destination/>} />
        <Route path="/destination2" element={<Destination2/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/itinerary" element={<Itinerary/>} />
        <Route path="/createpoll" element={<CreatePoll  userId={userId} tripId={tripId} />} />
        <Route path="/createpolldes" element={<CreatePollD  userId={userId} tripId={tripId} />} />
        <Route path="/adddestination" element={<AddDestination/>} />
        <Route path="/addmembers" element={<AddMembers tripId={tripId} />} />
        <Route path="/launchpoll" element={<LaunchPoll/>} />
        <Route path="/launchpoll1" element={<LaunchPoll1/>} />
        {/* <Route path = "/fetcheddestination" element = {<FetchedDestination/>}/> */}
        <Route path = "/fetcheddestination" element = {<FetchedDestination/>}/>
        <Route path = "/demopoll" element = {<DemoPoll/>}/>
        <Route path = "/tripinvitation" element = {<TripInvitation/>}/>  
        <Route path = "/route" element = {<Places/>}/>   
        <Route path = "/tripsection" element = {<TripSection/>}/>  
        <Route path = "/myitinerary" element = {<MyItinerary/>}/>  
        <Route path = "/createitenerary" element = {<CreateItenerary/>}/> 
        <Route path = "/createitenerary1" element = {<CreateItenerary1/>}/>  
        <Route path = "/createitenerary2" element = {<CreateItenerary2/>}/>  
        <Route path = "/createitenerary3" element = {<CreateItenerary3/>}/>   
        <Route path = "/myitinerary1" element = {<MyItinerary1/>}/>
        <Route path = "/route1" element = {<Places1/>}/>  
        <Route path = "/pollresult" element = {<PollResult/>}/>  
        <Route path="/dlaunchpoll" element={<DLaunchPoll/>} />
        <Route path = "/dpollresult" element = {<DPollResult/>}/>  
        <Route path = "/createpolldate" element = {<CreatePollDate/>}/>  
      </Routes>
    </Router>
  );
}

export default App;