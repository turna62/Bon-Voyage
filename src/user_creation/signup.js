import React, { Component } from 'react';
import './ucstyles.css';

export default class SignUp extends Component {
    // to get values from the form
    constructor (props){
        super(props)
        this.state = {
            username:"",
            email:"",
            password:"",
            confirmpassword:""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
    }
    // console values
    handleSubmit(e){
        e.preventDefault();
        const {username, email, password, confirmpassword} = this.state;
        console.log(username, email, password, confirmpassword);
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
                password,
                confirmpassword
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "OK!"){
 
                alert("A verification email has been sent! Kindly check your email!");
                // this.setState({
                //     username: "",
                //     email: "",
                //     password: "",
                //     confirmpassword: ""
                // });
                // alert("A verification link has been sent to your email");

            } else {
                alert("Error! Something went wrong!");
                
            }
        })
    }
    render(){
        // const { username, email, password, confirmpassword } = this.state;
        return(

<body class="signupbody">

   
	<div class="main-w3layouts wrapper">
		<div class="main-agileinfo">
			<div class="agileits-top">
            <h1>Sign Up</h1>
				<form onSubmit = {this.handleSubmit}>
					<input class="text" type="text" name="username" placeholder="Username" required="" onInput = {e=>this.setState({username:e.target.value})}/>
					<input class="text email" type="email" name="email" placeholder="Email" required="" onInput = {e=>this.setState({email:e.target.value})}/>
					<input class="text" type="password" name="password" placeholder="Password" required="" id="password" onInput = {e=>this.setState({password:e.target.value})}/>
					<i class="bi bi-eye-slash" id="togglePassword"></i>
					<input class="text w3lpass" type="password" name="confirmpassword" placeholder="Confirm Password" required="" id="cpassword"onInput = {e=>this.setState({confirmpassword:e.target.value})}/>
					<input type="submit" value="SIGNUP"/>
				</form>
				<p><a href="http://localhost:3000"><u>Back</u> </a></p>
			</div>
		</div>
		
	
	</div>
	

</body>
        )
    
               
    }
}