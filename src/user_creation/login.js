import React, { Component } from 'react';
import './ucstyles.css';

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
        window.location.href = "./myTrip";
        } else {
            alert("Error! Something went wrong!");
        }
    })
}

  render() {
    return (
        <body class="signupbody">

   
	<div class="main-w3layouts wrapper">
		
		<div class="main-agileinfo">
			<div class="agileits-top">
            <h1>Log In</h1>
				<form onSubmit = {this.handleSubmit}>
					<input class="text email" type="email" name="email" placeholder="Email" required="" onInput = {e=>this.setState({email:e.target.value})}/>
					<input class="text" type="password" name="password" placeholder="Password" required="" id="password" onInput = {e=>this.setState({password:e.target.value})}/>
					<i class="bi bi-eye-slash" id="togglePassword"></i>
					<input type="submit" value="LOGIN"/>
				</form>
				<p>Don't have an account? Sign Up <a href="http://localhost:3000/sign-up">Here</a></p>
			</div>
		</div>
		
	
	</div>
	

</body>
         )
  }
}