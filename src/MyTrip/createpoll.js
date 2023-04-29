import React from 'react';
import './mytrip.css';


class CreatePoll extends React.Component{
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
				<form >
					<input class="texti" type="text" name="poll" placeholder="Write your question....*" required="" />
                   <h5 class="ccpll">Answer (Add up to 05)</h5>

					<input class="textt" type="text" name="poll" placeholder="Answer 1" required="" />
                    <input class="textt" type="text" name="poll" placeholder="Answer 2" required="" />
                    <input class="textt" type="text" name="poll" placeholder="Answer 3" required="" />
                    <input class="textt" type="text" name="poll" placeholder="Answer 4" required="" />
                    <input class="textt" type="text" name="poll" placeholder="Answer 5" required="" />

                    <a class="btncreatepoll" href="http://localhost:3000/launchpoll1">LAUNCH POLL</a>


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
