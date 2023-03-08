import React, { Component } from 'react';
import './styles.css';

export default class LogIn extends Component {
    constructor (props){
        super(props)
        this.state = {
            email:"",
            password:""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
 }
 handleSubmit(e){
    e.preventDefault();
    const {email, password} = this.state;
    console.log(email, password);
    fetch("http://localhost:5000/login_user",{
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type":"application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
    .then((res) => res.json()) // convert data into JSON
    .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "OK!"){
            alert("Logged In Successfully!"); 
        window.localStorage.setItem("token", data.data); // storing token in data
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "./userProfile";
        } else {
            alert("Error! Something went wrong!");
        }
    })
}
  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <h3>Sign In</h3>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onInput = {e=>this.setState({email:e.target.value})} 
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onInput = {e=>this.setState({password:e.target.value})} 
          />
        </div>

        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    )
  }
}