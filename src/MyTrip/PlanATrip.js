import React from 'react';
 import '../Home/HomeCss/styles.css';
 import './css/bootstrap.min.css';
 import './css/datepicker.css';
 import'./css/tooplate-style.css';
 
 class TripPlan extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            tripName:"",
            destination:"",
            startDate:"",
            endDate:"",
            members:""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
   
    }
             // console values
             handleSubmit(e){
                e.preventDefault();
                const {tripName, destination, startDate, endDate, members} = this.state;
                console.log(tripName, destination, startDate, endDate, members);
                fetch("http://localhost:5000/insert",{ // call API
                    method: "POST",
                    crossDomain: true,
                    headers:{
                        "Content-Type":"application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        tripName,
                        destination,
                        startDate,
                        endDate,
                        members
                    }),
                })
                .then((res) => res.json()) // convert data into JSON
                .then((data) => {
                    console.log(data, "userSubmit");
                    if (data.status === "OK!"){
                        alert("Submitted!");
                        window.location.href = "./detailtripplan";
                    } else {
                        alert("Error! Something went wrong!");
                    }
                })
            }
    render(){

        return(
             <div class="planbody">
    
    
	{/* <div class="spinner-wrapper">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div> */}
  

   
    <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
    <h3 class="logo">Bon VOYAGE!</h3>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="http://localhost:3000">HOME <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll" href="http://localhost:3000">LOG OUT <span class="sr-only">(current)</span></a>
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
                                    <h1>Bon <span id="js-rotating">VOYAGE!</span></h1>
                                    <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p>
                                      

                                

    <div class="tm-section tm-bg-img" id="tm-section-1">
                <div class="tm-bg-white ie-container-width-fix-2">
                    <div class="container ie-h-align-center-fix">
                        <h2 class="startedtxt">Let's get you started!</h2>
                        <h6 class="startedtxt">(select if decided)*</h6>
                        <div class="row">
                            <div class="col-xs-12 ml-auto mr-auto ie-container-width-fix">
                                <form onSubmit = {this.handleSubmit}  class="tm-search-form tm-section-pad-2" >
                                    <div class="form-row tm-search-form-row">

                                      <div class="form-group tm-form-element tm-form-element-100">
                                            <input name="tripName" type="text" class="form-control" id="inputCity" placeholder="Trip Name" onInput = {e=>this.setState({tripName:e.target.value})}/>
                                        </div>
                                        
                                        <div class="form-group tm-form-element tm-form-element-50">
                                            <i class="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                            <input name="startDate" type="date" class="form-control" id="inputCheckIn" placeholder="Start date" onInput = {e=>this.setState({startDate:e.target.value})}/>
                                        </div>
                                        <div class="form-group tm-form-element tm-form-element-50">
                                            <i class="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                            <input name="endDate" type="date" class="form-control" id="inputCheckOut" placeholder="End date" onInput = {e=>this.setState({endDate:e.target.value})}/>
                                        </div>
                                    </div>
                                    <div class="form-row tm-search-form-row">
                                        <div class="form-group tm-form-element tm-form-element-100">
                                            <i class="fa fa-map-marker fa-2x tm-form-element-icon"></i>
                                            <input name="destination" type="text" class="form-control" id="inputCity" placeholder="Type your destination *(if decided)" onInput = {e=>this.setState({destination:e.target.value})}/>
                                        </div>
                                        

                                        <div class="form-group tm-form-element tm-form-element-100">
                                            <input name="members" type="text" class="form-control" id="inputCity" placeholder="Total members.." onInput = {e=>this.setState({tripName:e.target.value})}/>
                                        </div>

                                                      
                                        {/* <a class="btn-solid-lllg page-scroll" href="http://localhost:3000/detailtripplan">Continue</a> */}
                                        {/* <a class="btn-solid-lllg page-scroll" >Continue</a> */}
                                        <input class="btn-solid-lllg" type="submit" value="CONTINUE"/>
                                        
                                        
                                      </div>
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