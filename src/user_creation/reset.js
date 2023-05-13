import React, { Component } from 'react';
import './ucstyles.css';

export default class SignUp extends Component {
    // to get values from the form
    constructor (props){
        super(props)
        this.state = {
            
            email:""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
    }
    // console values
    handleSubmit(e){
        e.preventDefault();
        const {username, email, password} = this.state;
        console.log(username, email, password);
        fetch("http://localhost:5000/forgot-password",{ // call API
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
    
                email,
                
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "userRegister");
            // if (data.status === "OK!"){
            //     alert("Done successfully!");
            // } else {
            //     alert("Error! Something went wrong!");
            // }
            alert(data.status);
        });
    }
    render(){
        return(

<body class="resetbody">

   
	<div class="main-w3layouts wrapper">
		<div class="main-agileinfor">
			<div class="agileits-top">
            <h1>Forgot Password</h1>
				<form onSubmit = {this.handleSubmit}>
					
					<input class="text inputmail" type="email" name="email" placeholder="Email" required="" onInput = {e=>this.setState({email:e.target.value})}/>
					
					<input class="inputsubmit" type="submit" value="Submit"/>
				</form>
				{/* <p>Or Log In <a href="http://localhost:3000/sign-in"><u>Here </u> </a></p> */}
			</div>
		</div>
		
	
	</div>
	

</body>
        )
    
               
    }
}