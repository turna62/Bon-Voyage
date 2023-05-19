import React, { useState, useEffect } from 'react';
import './polls.css';
import './mytrip.css';
import '../Home/HomeCss/styles.css';

 class LaunchPoll1 extends React.Component {


  constructor(props) {
    super(props); 
    this.state = {
      pollId: null,
      question: "",
      options: [  {count: 0}],
      userId: null,
      tripId:null,
      finalResult: null,
      voteId: null,
      userData:"",
      tripData:""
      //winner: null
  
      //votes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
    this.handleClosePoll = this.handleClosePoll.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {

    const params = new URLSearchParams(window.location.search);

   
        const userId = params.get('userId');
      
        console.log(userId); 
       
        this.setState({ userId: userId });
        const tripId = params.get('tripId');
      
        console.log(tripId); 
       
        this.setState({ tripId: tripId });
        
    const pollId = params.get('pollId');
    console.log(pollId);
    this.setState({ pollId: pollId});
   
    

// Find the vote with the desired pollId



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


    // Fetch poll data from server
    fetch(`http://localhost:5000/getpollsbypollId`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
       body: JSON.stringify({
        pollId: pollId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "poll data");
        if (data.status === "OK!") {
            // Find the poll object with the specified pollId
            const poll = data.polls.find((p) => p._id === pollId);
            if (poll) {
              this.setState({
                question: poll.question,
                options: poll.options,
                votes: poll.votes,
              });
            } else {
              alert("Error! Poll not found!");
            }
          } else {
            alert("Error! Something went wrong!");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while retrieving poll data");
        });
  }


  handleSubmit(e) {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="count"]:checked');
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }
    const selectedOptionId = parseInt(selectedOption.value, 10);
    console.log(selectedOptionId);
    const { pollId, userId, options, tripId} = this.state;
 
    const count = options[0].count;

    fetch(`http://localhost:5000/vote`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        pollId: pollId,
        optionId: selectedOptionId,
        tripId:tripId,
        userId: userId, 
        options: {
          count: count
        }
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id === pollId) {
          if (data.finalResult) {
            this.setState({
              finalResult: data.finalResult,
            });
          } else {
            this.setState({
              votes: data.votes,
              options: data.options,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while submitting your vote");
      });
  }

  handleClosePoll() {
    const confirmClose = window.confirm('Are you sure you want to close this poll? This action will close the poll for everyone on your trip and prevent further voting.');

    const { pollId } = this.state;
    //const { finalResult } = this.state;
  if (confirmClose){
    fetch(`http://localhost:5000/closepoll`, {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        pollId: pollId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response
        console.log(data);
        if (data.message === 'Final result') {
          //this.setState({ winner: data.winner });
          window.location.href = `http://localhost:3000/pollresult?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}&pollId=${encodeURIComponent(this.state.pollId)}`;
        }
      })
    
      
      .catch((error) => {
        console.error(error);
        alert('An error occurred while closing the poll');
      });
    }
  }

  handleEdit = () => {
    const selectedOption = document.querySelector('input[name="count"]:checked');
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }
    const selectedOptionId = parseInt(selectedOption.value, 10);
    console.log(selectedOptionId);
    const { pollId, userId, tripId } = this.state; // 
  
    fetch(`http://localhost:5000/vote/change`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pollId: pollId,
        optionId: selectedOptionId,
        userId: userId,
        tripId: tripId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response message
        alert(data.message); // Display the response message to the user
        
    fetch(`http://localhost:5000/getpollsbypollId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pollId: pollId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if the response is successful
        if (data.status === 'OK!') {
          // Access the retrieved polls data
          const polls = data.polls;

          // Find the poll with the matching pollId
          const poll = polls.find((p) => p._id === pollId);
          if (poll) {
            // Find the option with the matching optionId
            const option = poll.options.find((o) => o.id === selectedOptionId);
            if (option) {
              // Update the count of the selected option
       

              // Update the state with the updated count
              this.setState({ options: [...poll.options] });
            } else {
              console.error('Option not found');
              alert('An error occurred while updating the vote count');
            }
          } else {
            console.error('Poll not found');
            alert('An error occurred while updating the vote count');
          }
        } else {
          // Handle the error response
          console.error(data.message);
          alert('An error occurred while retrieving poll data');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching poll data');
      });
  
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while editing the vote');
      });
  };
  
  

render(){
    const { question, options, options: { count } } = this.state;

   
  return (



    <div class="deetailplan">

         <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                <h3 class="logo"><i class="fa fa-anchor"></i> Bon VOYAGE!</h3>
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="http://localhost:3000"><i class="fa fa-home"></i> HOME <span class="sr-only">(current)</span></a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link page-scroll"  href={`http://localhost:3000/myprofile?userId=${encodeURIComponent(this.state.userId)}`}> <i class='fas fa-user-circle'></i> MY PROFILE</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro"><i class="fa fa-sign-out"></i> LOG OUT</a>
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
                                    <h1>Let's Plan, {this.state.userData.username}!</h1>
                                    {/* <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p> */}


                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 


     <div>

        <h4 class="tripname">{this.state.tripData.tripName}</h4><hr></hr>
        <a class="btnaddmembers"  href={`http://localhost:3000/addmembers?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>+ Add Members</a>
        <ul class="ul">
        <li class="li"><a href={`http://localhost:3000/overview?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Overview</a></li>
        <li class="ovwli"> <a href={`http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Polls</a></li>
        <li class="li"> <a href={`http://localhost:3000/date?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Date</a></li>
        <li class="li"> <a href={`http://localhost:3000/destination?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Destination</a></li>
        <li class="li"> <a href={`http://localhost:3000/route?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Route</a></li>
        <li class="li"> <a href={`http://localhost:3000/itinerary?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}`}>Itinerary</a></li>
     </ul>

     </div> 

       
    <div className="pollbodyy">
    
      <div className="wrapperr">
        <header>Question: {question}</header>
        <div className="poll-area">
          {/* <ul>{pollOptions}</ul> */}
        
          <ul>


 
          <form onSubmit={this.handleSubmit}>
  {options.map((option) => (
    option.value !== '' && (
      <div className="option-label" key={option.id}>
        <input type="radio" class="voteinput" name="count" value={option.id} id={option.id} onInput={e => this.setState({ count: e.target.value })} />
        <label htmlFor={option.id}>
          {option.value}
          <div class="votedis">{option.count} votes</div>
        </label>
      </div>
    )
  ))}
  <button class="pollbtn1" type="submit">Submit</button>
  

</form>
 

<button class="pollbtn1" type="button" onClick={this.handleClosePoll}>Close</button>


<button class="pollbtn1" type="button" onClick={this.handleEdit}>Change</button>




</ul>
        
        </div>
      </div>
      <div class="pphead">
    <h3 class="head">Vote Here!</h3>
<p class= "uheadp">Cast your votes here to complete polling.</p> 

</div> 

{/* <a class="pollbtn page-scroll" href="http://localhost:3000/createpoll">Create Poll</a> */}

    </div>

            
            </div>

  );
}
 }

export default LaunchPoll1;