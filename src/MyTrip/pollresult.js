

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


      

       
          
<p>Question: {question}</p>
        <p>Winner:{winner} </p>
      




     
        
            </div>

        )

    }
}

export default PollResult;