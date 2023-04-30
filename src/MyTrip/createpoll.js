import React from 'react';
import './mytrip.css';


class CreatePoll extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          question: "",
          options: [
            { id: 0, value: "" },
            { id: 1, value: "" },
            { id: 2, value: "" },
            { id: 3, value: "" },
            { id: 4, value: "" },
          ],
          tripId: props.tripId,
          userId: props.userId
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }

      handleSubmit(e){
        e.preventDefault();
        const { question, options, tripId, userId } = this.state;
        
        console.log(question, options, tripId, userId);
        fetch("http://localhost:5000/createpoll", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("userId") ,
          //  authorization: localStorage.getItem("email") ,
          },
          body: JSON.stringify({
            question,
            options,
            tripId,
            userId
            
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "pollSubmit");
            if (data.status === "OK!") {
                
                alert("gese" );
            } else {
              alert(`went wrong: ${data.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Error! Something went wrong while calling the API.");
          });
      }

    render(){

        return(
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

    <div class="mainn-w3layouts wrapper">
		<div class="mainn-agileinfo">
			<div class="agileitss-top">
            <h3 class="cpoll">Create Poll</h3><hr></hr>
            <h5 class="ccpoll">Write a custom question with up to 05 answers travelers can choose from.</h5>
				<form onSubmit = {this.handleSubmit} >
					<input class="texti" type="text" name="question" placeholder="Write your question....*" required="" onInput = {e=>this.setState({question:e.target.value})} />
                   <h5 class="ccpll">Answer (Add up to 05)</h5>

                   {/* <input class="textt" type="text" name="option1" placeholder="Answer 1" required="" onInput={e => this.setState({options: { ...this.state.options, 0: e.target.value }})} />
                  <input class="textt" type="text" name="option2" placeholder="Answer 2" required="" onInput={e => this.setState({options: { ...this.state.options, 1: e.target.value }})} />
                   <input class="textt" type="text" name="option3" placeholder="Answer 3" required="" onInput={e => this.setState({options: { ...this.state.options, 2: e.target.value }})} />
                     <input class="textt" type="text" name="option4" placeholder="Answer 4" required="" onInput={e => this.setState({options: { ...this.state.options, 3: e.target.value }})} />
                      <input class="textt" type="text" name="option5" placeholder="Answer 5" required="" onInput={e => this.setState({options: { ...this.state.options, 4: e.target.value }})} /> */}


                    {/* <a class="btncreatepoll" href="http://localhost:3000/launchpoll1">LAUNCH POLL</a> */}

                    <input
  class="textt"
  type="text"
  name="options"
  placeholder="Answer 1"
  required=""
  onInput={(e) =>
    this.setState({
      options: this.state.options.map((option) =>
        option.id === 0 ? { ...option, value: e.target.value } : option
      ),
    })
  }
/>

<input
  class="textt"
  type="text"
  name="options"
  placeholder="Answer 2"
  required=""
  onInput={(e) =>
    this.setState({
      options: this.state.options.map((option) =>
        option.id === 1 ? { ...option, value: e.target.value } : option
      ),
    })
  }
/>

<input
  class="textt"
  type="text"
  name="options"
  placeholder="Answer 3"
  required=""
  onInput={(e) =>
    this.setState({
      options: this.state.options.map((option) =>
        option.id === 2 ? { ...option, value: e.target.value } : option
      ),
    })
  }
/>

<input
  class="textt"
  type="text"
  name="options"
  placeholder="Answer 4"
  required=""
  onInput={(e) =>
    this.setState({
      options: this.state.options.map((option) =>
        option.id === 3 ? { ...option, value: e.target.value } : option
      ),
    })
  }
/>
<input
  class="textt"
  type="text"
  name="options"
  placeholder="Answer 5"
  required=""
  onInput={(e) =>
    this.setState({
      options: this.state.options.map((option) =>
        option.id === 4 ? { ...option, value: e.target.value } : option
      ),
    })
  }
/>



                    <input class="btncreatepoll" type="submit" value="LAUNCH POLL"/>

				</form>
				<p><a href="http://localhost:3000/polls"><u>Back</u> </a></p>
			</div>
		</div>
    </div>

         <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-container about">
                        <h4>Few Words About Bon Vogage!</h4>
                        <p class="white">We are passionate about helping you to arrange your trip as best as we can.</p></div>
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Links</h4>
                        <ul class="list-unstyled li-space-lg white">
                            <li>
                                <a class="white" href="#your-link">startupguide.com</a>
                            </li>
                            <li>
                                <a class="white" href="terms-conditions.html">Terms & Conditions</a>
                            </li>
                            <li>
                                <a class="white" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Tools</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">businessgrowth.com</a>
                            </li>
                            <li>
                               <a class="white" href="#your-link">influencers.com</a>
                            </li>
                            <li class="media">
                                <a class="white" href="#your-link">optimizer.net</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
                <div class="col-md-2">
                    <div class="text-container">
                        <h4>Partners</h4>
                        <ul class="list-unstyled li-space-lg">
                            <li>
                                <a class="white" href="#your-link">unicorns.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">staffmanager.com</a>
                            </li>
                            <li>
                                <a class="white" href="#your-link">association.gov</a>
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
export default CreatePoll;
