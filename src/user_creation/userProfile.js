import React, { Component } from "react";

export default class UserProfile extends Component{
constructor(props){
    super(props);
    this.state = {
        userData: "",
    };
}
componentDidMount(){
    fetch("http://localhost:5000/userData",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "userData");
            this.setState({userData: data.data});
            if(data.data == 'Token Expired!'){
                alert("Token expired! Kindly login again."); 
                window.localStorage.clear();
                window.location.href = "./sign-in";
            }
        });
}
// logOut = () => {
//     window.localStorage.clear(); // good practice to clear all details rather than just the token
//     window.location.href = "./sign-in";
// }
    render(){
        return(
            <div>
                <b>Name:</b> {this.state.userData.username}
                <br/>
                <b>Email:</b> {this.state.userData.email}<br/>
                {/* <button onClick={this.logOut}>Log Out</button> */}

            </div>

        );
    }
}