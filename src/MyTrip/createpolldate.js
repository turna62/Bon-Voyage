import React from 'react';
import './mytrip.css';


class CreatePollDate extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          question: "",
          options: [
            { id: 0, value: "" },
            { id: 1, value: "" },
            { id: 2, value: "" },
            { id: 3, value: "" },
            
          ],
          tripId: props.tripId,
          userId: props.userId,
          userData: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this); // to read properties of state
      }

      componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tripId = params.get('tripId');
        
        console.log(userId); 
        console.log(tripId);
        this.setState({ userId: userId });
        this.setState({ tripId: tripId });

        const loadScript = (url, callback) => {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          script.defer = true;
          script.onload = callback;
          document.body.appendChild(script);
        };


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
    
      }
      

      handleSubmit(e, isTripOwner) {
        e.preventDefault();
        const { question, options, tripId, userId } = this.state;
        console.log (tripId, userId);
      
        // Set the addedMembers data based on the user role
        let addedMembers;
        if (isTripOwner) {
          addedMembers = null; // Trip owner has no added members
        } else {
          addedMembers = [userId]; // Added member is the current user
        }
      
        console.log(question, options, tripId, userId, addedMembers);
      
        fetch("http://localhost:5000/createpoll", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: localStorage.getItem("userId"),
          },
          body: JSON.stringify({
            question,
            options,
            tripId,
            userId,
            addedMembers,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
           // console.log(data, "pollSubmit");
           if (data.error) {
           
            const errorContainer = document.getElementById('error-container');
            errorContainer.innerHTML = `<div class="alert alert-danger custom-alert" role = "alert" >${data.error}</div>`;
            this.form.reset(); 
          }
            
            else if (data.status === "OK!") {
              //alert("Poll created successfully!");
              console.log(tripId);
              window.location.href = `http://localhost:3000/polls?userId=${encodeURIComponent(
                this.state.userId
              )}&tripId=${encodeURIComponent(this.state.tripId)}`;
            } else {
              alert(`went wrong: ${data.status}`);
              this.form.reset();
            }
          })
          .catch((error) => {
            console.error(error);
            //alert("Error! Something went wrong while calling the API.");
          });
      }
      
    
    render(){

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

        


    <div class="mainn-w3layouts wrapper">
   
		<div class="mainn-agileinfo">
   
			<div class="agileitss-top">

     
            <h3 class="cpoll">Create Poll</h3><hr></hr>
            <h5 class="ccpoll">Add up to four dates to create a poll and vote to finalize dates.</h5>
				<form ref={form => this.form = form} onSubmit={(e) => this.handleSubmit(e, this.props.isTripOwner)}>
					

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
 
  required=""
  onInput={(e) =>
    this.setState({
      options: this.state.options.map((option) =>
        option.id === 3 ? { ...option, value: e.target.value } : option
      ),
    })
  }
/>


<div id="error-container"></div>

                    <input class="inputsubmitt" type="submit" value="LAUNCH POLL"/>

                   
				</form>

				<p class="back1"><a href="http://localhost:3000/polls?userId=${encodeURIComponent(this.state.userId)}&tripId=${encodeURIComponent(this.state.tripId)}"><u>Back</u> </a></p>
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
export default CreatePollDate;