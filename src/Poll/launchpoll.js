import React, { useState, useEffect } from 'react';
import './poll.css';

function LaunchPoll() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [optionsList, setOptionsList] = useState([
    { id: 'opt-1', text: 'Answer 1', percent: 30, votes: 0 },
    { id: 'opt-2', text: 'Answer 2', percent: 20, votes: 0 },
    { id: 'opt-3', text: 'Answer 3', percent: 40, votes: 0 },
    { id: 'opt-4', text: 'Answer 4', percent: 10, votes: 0 },
    { id: 'opt-5', text: 'Answer 5', percent: 10, votes: 0 },
  ]);

  useEffect(() => {
    const sum = optionsList.reduce((acc, cur) => acc + cur.percent, 0);
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
            <span className="percent">{option.percent}%</span>
            <span className="votes">{option.votes} votes</span>
          </div>
          <input type="radio" name="poll" id={option.id} />
        </label>
      </li>
    );
  });

  return (
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
    </div>
  );
}

export default LaunchPoll;
