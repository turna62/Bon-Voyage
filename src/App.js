import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import SignUp from "./user_creation/signup";
import LogIn from "./user_creation/login";
import UserProfile from "./user_creation/userProfile";

import Home from "./Home/home";
import TripPlan from ".Home/PlanATrip";

function App() {

    const isLoggedIn = window.localStorage.getItem("loggedIn");
    return (
        
        <Router>
           <Routes>
           <Home />
           <TripPlan />
            <Route exact path = "/" element = {isLoggedIn == "true" ? <UserProfile/> : <LogIn/>}/>
            <Route path = "/sign-in" element={<LogIn/>}/>
            <Route path = "/sign-up" element={<SignUp/>}/>
            <Route path = "/userProfile" element={<UserProfile/>}/>
           </Routes>
        </Router>
        
        
    );
}
export default App;