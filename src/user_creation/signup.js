import React, { Component } from 'react';
import './ucstyles.css';

export default class SignUp extends Component {
    // to get values from the form
    constructor (props){
        super(props)
        this.state = {
            username:"",
            email:"",
            password:""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
    }
    // console values
    handleSubmit(e){
        e.preventDefault();
        const {username, email, password} = this.state;
        console.log(username, email, password);
        fetch("http://localhost:5000/register",{ // call API
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "OK!"){
                alert("User account created successfully!");
            } else {
                alert("Error! Something went wrong!");
            }
        })
    }
    render(){
        return(

<body class="signupbody">

   
	<div class="main-w3layouts wrapper">
		<h1>Sign Up</h1>
		<div class="main-agileinfo">
			<div class="agileits-top">
				<form onSubmit = {this.handleSubmit}>
					<input class="text" type="text" name="Username" placeholder="Username" required="" onInput = {e=>this.setState({username:e.target.value})}/>
					<input class="text email" type="email" name="email" placeholder="Email" required="" onInput = {e=>this.setState({email:e.target.value})}/>
					<input class="text" type="password" name="password" placeholder="Password" required="" id="password" onInput = {e=>this.setState({password:e.target.value})}/>
					<i class="bi bi-eye-slash" id="togglePassword"></i>
					<input class="text w3lpass" type="password" name="password" placeholder="Confirm Password" required="" id="cpassword"/>
					<input type="submit" value="SIGNUP"/>
				</form>
				<p>Or Log In <a href="#"><u>Here </u> </a></p>
			</div>
		</div>
		
	
	</div>
	

</body>
        )
    
               
    }
}