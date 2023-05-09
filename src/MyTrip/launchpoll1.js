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
  
      //votes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
  }

  componentDidMount() {

    const params = new URLSearchParams(window.location.search);

   
        const userId = params.get('userId');
      
        console.log(userId); 
       
        this.setState({ userId: userId });
        
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
            alert("Error! tSomething went wrong!");
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
    const { pollId, userId, options} = this.state;
 
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
        userId: userId, 
        options: {
          count: count
        }
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.status === "OK!") {
        //   const poll = data.polls.find((p) => p._id === pollId);
        //   this.setState({
        //     votes: poll.votes,
        //     options: poll.options,
        //   });
        // } else {
        //   alert("Error! Something went wrong!");
        // }

        if (data._id === pollId) {
          this.setState({
            votes: data.votes,
            options: data.options,
          });
        }
        
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while submitting your vote");
      });
  }
  

render(){
    const { question, options, options: { count } } = this.state;
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
        <li class="li"><a href="http://localhost:3000/route">Route</a></li>
        <li class="li"><a href="http://localhost:3000/itinerary">Itinerary</a></li>
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
        <input type="radio" name="count" value={option.id} id={option.id} onInput={e => this.setState({ count: e.target.value })} />
        <label htmlFor={option.id}>
          {option.value}
          <div class="votedis">{option.count} votes</div>
        </label>
      </div>
    )
  ))}
  <button class="pollbtn1" type="submit">Submit</button>
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