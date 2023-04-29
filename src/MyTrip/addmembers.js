import React from 'react';
import './mytrip.css';


class AddMembers extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
          email: "",
          tripId: props.tripId,
          //userId: props.userId
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }

      handleSubmit(e){
        e.preventDefault();
        const { email, tripId } = this.state;
        
        console.log(email, tripId);
        fetch("http://localhost:5000/add-member", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("userId") ,
          //  authorization: localStorage.getItem("email") ,
          },
          body: JSON.stringify({
            email,
            tripId,
            
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userSubmit");
            if (data.status === "OK!") {
                
                alert('Invitation Successfully!');
            } else {
              alert(`went wrong: ${data.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Error! Something went wrong while calling the API.");
          });
      }


    render(){

        return(
            <div class="deetailplan">

         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo">Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000">HOME <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro">LOG OUT</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000/myprofile">MY PROFILE</a>
                        </li>
                       
                        
                  </ul>

              </div>
         </nav>

    <div class="mainn-w3layouts wrapper">
		<div class="mainn-agileinfo">
			<div class="agileitss-top">
            <h3 class="cpoll">Share this Trip</h3>
            <h5 class="ccpoll">Invite friends to suggest, comment, and vote on trip details.</h5> <hr></hr>
				<form onSubmit = {this.handleSubmit}>
                   <h5 class="ccpll">Invite by email</h5>

					<input class="textt" type="text" name="email" placeholder="Add email" required=""  onInput = {e=>this.setState({email:e.target.value})} />

                    {/* <a class="savedesbtn" >ADD</a> */}
<input type="submit" value="Submit"/> 
				</form>
			</div>
		</div>
    </div>

         <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4>Few Words About Bon Vogage!</h4>
                        <p class="white">We are passionate about helping you to arrange your trip as best as we can.</p></div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Links</h4>
                        <ul class="list-unstyled li-space-lg white">
                            <li>
                                <a class="white" href="#your-link">startupguide.com</a>
                            </li>
                            <li>
                                <a class="white" href="terms-conditions.html">Terms & Conditions</a>
                            </li>
                            <li>
                                <a class="white" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Tools</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">businessgrowth.com</a>
                            </li>
                            <li>
                               <a class="white" href="#your-link">influencers.com</a>
                            </li>
                            <li class="media">
                                <a class="white" href="#your-link">optimizer.net</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Partners</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">unicorns.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">staffmanager.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">association.gov</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
            </div>
        </div> 
    </div> 
    
            </div>

        )
    }
}
export default AddMembers;
