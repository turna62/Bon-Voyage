import React, { useState, useEffect } from 'react';
import './polls.css';
import './mytrip.css';
import '../Home/HomeCss/styles.css';

 class LaunchPoll1 extends React.Component {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [optionsList, setOptionsList] = useState([
//     { id: 'opt-1', text: 'Answer 1', votes: 0 },
//     { id: 'opt-2', text: 'Answer 2', votes: 0 },
//     { id: 'opt-3', text: 'Answer 3', votes: 0 },
//     { id: 'opt-4', text: 'Answer 4', votes: 0 },
//     { id: 'opt-5', text: 'Answer 5', votes: 0 },
//   ]);

//   useEffect(() => {
//     const sum = optionsList.reduce((acc, cur) => acc + cur, 0);
//     setTotalVotes(sum);
//   }, []);

//   const handleOptionClick = (option) => {
//     if (!hasVoted) {
//       setSelectedOption(option);
//       setHasVoted(true);
//       const updatedOptions = optionsList.map((opt) => {
//         if (opt.id === option) {
//           return { ...opt, votes: opt.votes + 1 };
//         }
//         return opt;
//       });
//       setOptionsList(updatedOptions);
//     }
//   };

//   const handleSubmit = () => {
//     console.log(`Selected option: ${selectedOption}`);
//     console.log(`Total votes: ${totalVotes}`);
//     console.log(`Has voted: ${hasVoted}`);
//   };

//   const pollOptions = optionsList.map((option) => {
//     const isSelected = selectedOption === option.id;
//     const classNames = ['option'];
//     if (isSelected) {
//       classNames.push('selected');
//     }
    // return (
    //   <li key={option.id} onClick={() => handleOptionClick(option.id)}>
    //     <label htmlFor={option.id} className={classNames.join(' ')}>
    //       <div className="row">
    //         <div className="column">
    //           <span className="circle"></span>
    //           <span className="text">{option.text}</span>
    //         </div>
    //         <span className="votes">{option.votes} votes</span>
    //       </div>
    //       <input type="radio" name="poll" id={option.id} />
    //     </label>
    //   </li>
    // );
  
  //);

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
                // votes: poll.votes,
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



{options.map((option) => (
  (option.value !== '') && (
    <li key={option.id}>
      <label>{option.value}</label>
    </li>
  )
))}






</ul>
          <button className="btnncreatepoll"> 
            Finish
          </button>
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
