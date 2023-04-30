import React, { useState, useEffect } from 'react';
import './polls.css';
import './mytrip.css';
import '../Home/HomeCss/styles.css';

function LaunchPoll1() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [optionsList, setOptionsList] = useState([
    { id: 'opt-1', text: 'Answer 1', votes: 0 },
    { id: 'opt-2', text: 'Answer 2', votes: 0 },
    { id: 'opt-3', text: 'Answer 3', votes: 0 },
    { id: 'opt-4', text: 'Answer 4', votes: 0 },
    { id: 'opt-5', text: 'Answer 5', votes: 0 },
  ]);

  useEffect(() => {
    const sum = optionsList.reduce((acc, cur) => acc + cur, 0);
    setTotalVotes(sum);
  }, []);

  const handleOptionClick = (option) => {
    if (!hasVoted) {
      setSelectedOption(option);
      setHasVoted(true);
      const updatedOptions = optionsList.map((opt) => {
        if (opt.id === option) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      setOptionsList(updatedOptions);
    }
  };

  const handleSubmit = () => {
    console.log(`Selected option: ${selectedOption}`);
    console.log(`Total votes: ${totalVotes}`);
    console.log(`Has voted: ${hasVoted}`);
  };

  const pollOptions = optionsList.map((option) => {
    const isSelected = selectedOption === option.id;
    const classNames = ['option'];
    if (isSelected) {
      classNames.push('selected');
    }
    return (
      <li key={option.id} onClick={() => handleOptionClick(option.id)}>
        <label htmlFor={option.id} className={classNames.join(' ')}>
          <div className="row">
            <div className="column">
              <span className="circle"></span>
              <span className="text">{option.text}</span>
            </div>
            <span className="votes">{option.votes} votes</span>
          </div>
          <input type="radio" name="poll" id={option.id} />
        </label>
      </li>
    );
  });

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
        <div className="poll-area">
          <ul>{pollOptions}</ul>
          <button className="btnncreatepoll" onClick={handleSubmit}>
            Finish
          </button>
        </div>
      </div>
      <div class="pphead">
    <h3 class="head">Polls</h3>
<p>Create another poll to help your group narrow down options or answer key questions.</p> 

</div> 

<a class="pollbtn page-scroll" href="http://localhost:3000/createpoll">Create Poll</a>

    </div>

            
            </div>

  );
}

export default LaunchPoll1;
