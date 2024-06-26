import React from 'react';
import { useParams, Link } from "react-router-dom";
import './mytrip.css';

class PollResult extends React.Component{

    constructor(props) { 
        super(props);
        this.state = {
          userId: null,
          tripId: null,
          tripData:"",
          userData:"", 
          myPolls:[],  
          notifsData:[],
          pollId: null,
          question: "",
          //options: [  {count: 0}],
          winner:[]
        };
        this.updateAllIsRead = this.updateAllIsRead.bind(this);
      } 
    
      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tripId = params.get('tripId');
        
        console.log(userId); 
        console.log(tripId);
        this.setState({ userId: userId });
        this.setState({ tripId: tripId });

        const pollId = params.get('pollId');
        console.log(pollId);
        this.setState({ pollId: pollId});

        fetch(`http://localhost:5000/getwinner`, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    tripId: tripId,
    userId: userId,
    pollId: pollId
  }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.winner  && data.question) {
      const { winner, question } = data;
      // Update the winner state or display the winner data
      console.log("Winner:", winner);
      console.log('Question:', question);
      this.setState({ winner, question });
    } else {
      // No winner found 
      console.log('no');
    }
  })
  .catch((error) => {
    console.error(error);
    // Handle error
  });

          
        fetch("http://localhost:5000/notifications",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              tripId: tripId,
              userId: userId
            }),
          })
          .then((res) => res.json()) // convert data into JSON
          .then((data) => {
            console.log(data, "notifsData");
            this.setState({notifsData: data});
          });

        fetch("http://localhost:5000/tripData",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                
                tripId: tripId,
            
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "tripData");
            this.setState({tripData: data.data});
            if(data.data == 'Token Expired!'){
                alert("Token expired! Kindly login again."); 
                window.localStorage.clear();
                window.location.href = "./sign-in";
            }
        });

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

          // Fetch polls data

      }

      updateAllIsRead = () => { 
        const params = new URLSearchParams(window.location.search);
       const userId = params.get('userId');
       const tripId = params.get('tripId');
       
       console.log(userId); 
       console.log(tripId);
       this.setState({ userId: userId });
       this.setState({ tripId: tripId });
       const unreadNotifs = this.state.notifsData.filter((notif) => !notif.isRead);
       const unreadNotifIds = unreadNotifs.map((notif) => notif._id);

     
       fetch('http://localhost:5000/notifications/read', {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json',
         },
         body: JSON.stringify({ userId:userId, tripId:tripId }),
       })
         .then((res) => res.json())
         .then((data) => {
           // Update the notifsData state to mark all notifications as read
           const updatedNotifsData = this.state.notifsData.map((notif) => ({
             ...notif,
             isRead: true,
           }));
           this.setState({ notifsData: updatedNotifsData });
         })
         .catch((error) => console.error(error));


     };
     
    
    render(){
const {myPolls} = this.state;
const { question, options, winner } = this.state;
        return(

    <div class="deetailplan">
      

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
                            <a class="nav-link page-scroll" href={`http://localhost:3000/planatrip?userId=${encodeURIComponent(this.state.userId)}`}> <i class="fas fa-suitcase-rolling"></i> NEW TRIP</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000/sign-in"><i class="fa fa-sign-out"></i> LOG OUT</a>
                        </li>
                       
                        
                    
                        
                  </ul>

              </div>
         </nav>

         <header id="header" class="headerr">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                            <div class="text-container">
                                    <h1 ><div class="lets">Let's Plan,</div><div class="js-rotating"> {this.state.userData.username}!</div></h1>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 


     <div> 

     <h4 class="tripname">{this.state.tripData.tripName}</h4><hr></hr>
        <a class="btnaddmembers" href={`http://localhost:3000/addmembers?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>+ Add Members</a>

        <ul class="ul">
        <li class="li"> <a href={`http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Overview</a></li>
        <li class="ovwli"> <a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Polls</a></li>
        <li class="li"> <a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Destination</a></li>
        <li class="li"> <a href={`http://localhost:3000/date?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Date</a></li>
        <li class="li"> <a href={`http://localhost:3000/route?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Route</a></li>
        <li class="li"> <a href={`http://localhost:3000/itinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Itinerary</a></li>
     </ul>

     </div> 

       
    <div className="pollbodyy">
    
      <div className="rwrapperr">
        <header>Question: {question}</header>
        <div className="poll-area">
        
                  <p>Winning Option: {winner} </p>
                  <a class="btn-solid-lgresult page-scroll" href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Back</a>

        
        </div>
      </div>
    <h3 class="resulthead">Polling Result: </h3>

    </div>
</div>
         

        );

    }
}

export default PollResult;