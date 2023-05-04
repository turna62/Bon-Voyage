


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
      options: [],
      //votes: [],
    };
  }

  componentDidMount() {

    const params = new URLSearchParams(window.location.search);
    const pollId = params.get('pollId');
    console.log(pollId);
    this.setState({ pollId: pollId});
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

render(){
    const { question, options, votes } = this.state;
  return (

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

         <header id="header" class="headerr">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-container">
                                    <h1>Let's Plan!</h1>
                                    {/* <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p> */}


                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 


     <div>

        <h4 class="tripname">Trip Name</h4><hr></hr>
        <a class="btnaddmembers" href="http://localhost:3000/addmembers">+ Add Members</a>
        <ul class="ul">
        <li class="li"><a href="http://localhost:3000/overview">Overview</a></li>
        <li class="ovwli"><a href="http://localhost:3000/polls">Polls</a></li>
        <li class="li"><a href="http://localhost:3000/date">Date</a></li>
        <li class="li"><a href="http://localhost:3000/destination">Destination</a></li>
        <li class="li"><a href="http://localhost:3000/activities">Activities</a></li>
        <li class="li"><a href="http://localhost:3000/route">Route</a></li>
        <li class="li"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
     </ul>

     </div> 

       
    <div className="pollbodyy">
    
      <div className="wrapperr">
        <header>Question:</header>
        <p>{question}</p>
        <div className="poll-area">
          {/* <ul>{pollOptions}</ul> */}
          <ul>



          <form>
  {options.map((option) => (
    (option.value !== '') && (
      <div className="option-label" key={option.id}>
        <input type="radio" name="vote" value={option.id} id={option.id} />
        <label htmlFor={option.id}>
          {option.value}
          {option.votes ? <span className="vote-count">{option.votes} votes</span> : null}
        </label>
      </div>
    )
  ))}
  <button style={{ backgroundColor: '#0d5358', color: 'white' }} type="submit">Vote</button>
</form>









</ul>
          {/* <button className="btnncreatepoll"> 
            Close Polling
          </button> */}
        </div>
      </div>
      <div class="pphead">
    <h3 class="head">Vote Here</h3>
<p>Cast your votes here to complete polling!</p> 

</div> 

{/* <a class="pollbtn page-scroll" href="http://localhost:3000/createpoll">Create Poll</a> */}

    </div>

            
            </div>

  );
}
 }

export default LaunchPoll1;