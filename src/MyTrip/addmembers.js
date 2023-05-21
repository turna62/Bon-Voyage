import React from 'react';
import './mytrip.css';


class AddMembers extends React.Component{
  

    constructor(props) {
        super(props)
        this.state = {
          email: "",
          tripId: props.tripId,
          userId: null,
          userData:""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }


      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        
        
        console.log(userId); 
        
        this.setState({ userId: userId });

        
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
                userId: userId,
            
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
      handleSubmit(e){
        e.preventDefault();
        console.log("Form submitted!"); 
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
            tripId
            
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userSubmit");
            if (data.error) {
           
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = `<div class="alert alert-danger custom-alert" role = "alert" >${data.error}</div>`;
                this.form.reset(); 
              }
            else if (data.status === "OK!") {
                
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = `<div class="alert alert-success custom-alert" role = "alert" >Invitation sent successfully!</div>`;
                this.form.reset(); 
             
                //this.form.reset();

            } else {
              //alert(`went wrong: ${data.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Error! Something went wrong while calling the API.");
          });
      }


      

    render(){
        const{userData} = this.state;
        console.log(userData);

        return(
            <div class="deetailplan">

         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo"> <i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}><i class='fas fa-user-circle'></i> {this.state.userData.username}</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000/sign-in"><i class="fa fa-sign-out"></i> LOG OUT</a>
                        </li>
                       
                        
                  </ul>

              </div> 
         </nav> 

    <div class="mainn-w3layouts wrapper">
		<div class="mainn-agileinfo">
			<div class="agileitss-top">
            <div id="error-container"></div>
            <h3 class="cpoll">Share this Trip <i class="fas fa-share"></i></h3>
            <h5 class="ccpolll">Invite friends to suggest, create polls and vote on trip details.</h5> <hr></hr>
				<form ref={form => this.form = form} onSubmit = {this.handleSubmit}>
                   <h5 class="ccplll">Invite via email <i class="fas fa-envelope"></i> </h5>

					<input class="textt" type="text" name="email" placeholder="Add email" required=""  onInput = {e=>this.setState({email:e.target.value})}  title="Please enter the email addresses of users who have verified accounts on our site!"/>

                    {/* <a class="savedesbtn" >ADD</a> */}
<input class="inputsubmitt" type="submit" value="Add"/> 
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
