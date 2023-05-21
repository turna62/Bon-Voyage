import React from 'react';
 import '../Home/HomeCss/styles.css';
 import'./css/tooplate-style.css';
 import './mytrip.css';
 
 class TripPlan extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            //userId :"",
            tripName:"",
            destination:"",
            startDate:"",
            endDate:"",
            members:"",
            userData:""
        };
        //console.log(this.props.userId);
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
   
    } 

    componentDidMount() {
        const userId = localStorage.getItem("userId");
        this.setState({ userId });

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
        const { tripName, destination, startDate, endDate, members } = this.state;
        const userId = localStorage.getItem("userId");
        console.log(tripName, destination, startDate, endDate, members, userId);
        fetch("http://localhost:5000/insert", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                authorization: localStorage.getItem("userId") 
            },
            body: JSON.stringify({
                tripName,
                destination,
                startDate,
                endDate,
                members,
                userId
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userSubmit");
            if (data.status === "OK!") {
                window.localStorage.setItem('tripId', data.tripId);
                window.location.href = `./overview?userId=${userId}&tripId=${data.tripId}`;
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
             <div class="planbody">
    
    <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
    <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                            <a class="nav-link page-scroll" href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}> <i class='fas fa-user-circle'></i> <span class="username">{this.state.userData.username}</span>
</a> </li>

                        <li class="nav-item">
                    <a class="nav-link page-scroll" href="http://localhost:3000/sign-in"><i class="fa fa-sign-out"></i> LOG OUT <span class="sr-only">(current)</span></a>
                </li>
                
            </ul>
                    </div>
    </nav>
   
                
    <header id="header" class="headerp">
        <div class="header-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="text-container">
                                    <h1>Bon <span class="js-rotating">VOYAGE!</span></h1>
                                    <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p>
                                      

                                

    <div class="tm-section tm-bg-img" id="tm-section-1">
                <div class="tm-bg-white ie-container-width-fix-2">
                    <div class="container ie-h-align-center-fix">
                        <h2 class="startedtxt">Let's get you started!</h2>
                        <div class="row">
                            <div class="col-xs-12 ml-auto mr-auto ie-container-width-fix">
                                <form onSubmit = {this.handleSubmit}  class="tm-search-form tm-section-pad-2" >
                                            <input name="tripName" type="text" class=" tripinput" id="inputCity" placeholder="Enter your trip name" onInput = {e=>this.setState({tripName:e.target.value})}/>
                                        
                            <input class="btn-solid-lllg" type="submit" value="CONTINUE"/>
                                        
                                        
                                      <img class="imgage" src="/travelingc.png" alt=""/>


                                </form>
                            </div>                        
                        </div>      
                    </div>
                </div>                  
            </div>
            </div>
                    </div> 
                </div> 
            </div> 
                
        </div>
    </header> 
      
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4></h4>
                        <p class="white"></p>
                    </div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Help</h4>
                        <ul class="list-unstyled li-space-lg white">
                           <li>

                           </li>
                        </ul>
                    </div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Social Media</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                
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

 export default TripPlan;