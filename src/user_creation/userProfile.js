import React, { Component } from "react";

export default class UserProfile extends Component{
// constructor(props){
//     super(props);
//     this.state = {
//         userData: "",
//         userId: props.userId,
//     };

// }

constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userData:""
    };
  }
// componentDidMount(){
//     const {  userId } = this.state;
//     console.log(this.state.userId);


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
// logOut = () => {
//     window.localStorage.clear(); // good practice to clear all details rather than just the token
//     window.location.href = "./sign-in";
// }
    render(){
        return(

            <body class="profilebody">
            <div class="deetailplan">

         {/* <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
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
                            <a class="nav-link page-scroll" href="http://localhost:3000/myprofile?userId=userId">MY PROFILE</a>
                        </li> */}
                       
{/*                         
                  </ul>

              </div>
         </nav> */}

         

         <div class="containerr mt-4 mb-4 p-3 d-flex justify-content-center">
             <div class="card p-4"> 
                 <div class=" image d-flex flex-column justify-content-center align-items-center"> 
                   
                     <span class="name mt-3">{this.state.userData.username}</span> 
                     <span class="idd">{this.state.userData.email}</span> 
                    
                  
                 <div class=" d-flex mt-2"> 
                     <button class="btn1 btn-dark">Edit Profile</button> 
                </div> 
                          
                         
                        
                    </div> 
                </div>
              </div>  


              <div class="footerp">
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

    </body>

        );
    }
}