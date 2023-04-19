import React, { useEffect } from 'react';
import './poll.css';

function LaunchPoll() {
  useEffect(() => {
    const options = document.querySelectorAll("label");
    for (let i = 0; i < options.length; i++) {
      options[i].addEventListener("click", () => {
        for (let j = 0; j < options.length; j++) {
          if (options[j].classList.contains("selected")) {
            options[j].classList.remove("selected");
          }
        }
        options[i].classList.add("selected");
        for (let k = 0; k < options.length; k++) {
          options[k].classList.add("selectall");
        }
        let forVal = options[i].getAttribute("for");
        let selectInput = document.querySelector("#" + forVal);
        let getAtt = selectInput.getAttribute("type");
        if (getAtt === "checkbox") {
          selectInput.setAttribute("type", "radio");
        } else if (selectInput.checked === true) {
          options[i].classList.remove("selected");
          selectInput.setAttribute("type", "checkbox");
        }
        let array = [];
        for (let l = 0; l < options.length; l++) {
          if (options[l].classList.contains("selected")) {
            array.push(l);
          }
        }
        if (array.length === 0) {
          for (let m = 0; m < options.length; m++) {
            options[m].removeAttribute("class");
          }
        }
      });
    }
  }, []);

  return (
    <>
    <div class="pollbodyy">
    <div class="wrapperr">
        <header>Question:</header>
        <div class="poll-area">
            <input type="checkbox" name="poll" id="opt-1"/>
            <input type="checkbox" name="poll" id="opt-2"/>
            <input type="checkbox" name="poll" id="opt-3"/>
            <input type="checkbox" name="poll" id="opt-4"/>
            <label for="opt-1" class="opt-1">
                <div class="row">
                    <div class="column">
                        <span class="circle"></span>
                        <span class="text">Answer 1</span>
                    </div>
                    <span class="percent">30%</span>
                </div>
            </label>
            <label for="opt-2" class="opt-2">
                <div class="row">
                    <div class="column">
                        <span class="circle"></span>
                        <span class="text">Answer 2</span>
                    </div>
                    <span class="percent">20%</span>
                </div>
            </label>
            <label for="opt-3" class="opt-3">
                <div class="row">
                    <div class="column">
                        <span class="circle"></span>
                        <span class="text">Answer 3</span>
                    </div>
                    <span class="percent">40%</span>
                </div>
            </label>
            <label for="opt-4" class="opt-4">
                <div class="row">
                    <div class="column">
                        <span class="circle"></span>
                        <span class="text">Answer 4</span>
                    </div>
                    <span class="percent">10%</span>
                </div>
            </label>
            <label for="opt-4" class="opt-4">
                <div class="row">
                    <div class="column">
                        <span class="circle"></span>
                        <span class="text">Answer 5</span>
                    </div>
                    <span class="percent">10%</span>
                </div>
            </label>
            <a class="btnncreatepoll" href="http://localhost:3000/polls">Finish</a>
        </div>
    </div>
    </div>
    </>
  );
}
export default LaunchPoll;  
