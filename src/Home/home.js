import React from 'react';
 import './HomeCss/styles.css';
 import './HomeCss/swiper.css';
 import './HomeCss/bootstrap.css';
 import './HomeCss/bootstrap.min.css';
 import './css1/style.css';
 

class HomePage extends React.Component{
    render(){

        return(


<body class="homebody">
            
            <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
             <h3 class="logo">Bon VOYAGE!</h3>

                
                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#header">HOME <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#intro">INTRO</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link page-scroll" href="#services">SERVICES</a>
                        </li>
                        
        
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/sign-in">LOG IN</a>
                            
                        </li>

                        

                        <li class="nav-item">
                          
                        <a class="nav-link" href="http://localhost:3000/search">SEARCH</a>
 
                    
                      </li>

                      
                  </ul>
                            
              </div>
         </nav> 
        
        
            <header id="header" class="header">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-container">
                                    <h1>Bon <span id="js-rotating">VOYAGE!</span></h1>
                                    <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p>


                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 
            
        
            

            <div id="intro" class="basic-1">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="text-container">
                                <div class="section-title">INTRO</div>
                                <h2>We Offer The Opportunity To Plan Your Trip!</h2>
                                <p>We understand the problems that one can face while planning a trip. </p>
                                <p class="testimonial-text">So, our mission at Bon Voyage is to help you to plan your trip by offering the outmost benefits that we can.</p>
                            </div>
                        </div> 
                        <div class="col-lg-7">
                            <div class="image-container">
                                <img class="img-fluid" src="images/project-6.jpg" alt="alternative"/>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 

  <div class="destination">        
    <div class="container-fluid py-5">
        <div class="container pt-5 pb-3">
            <div class="text-center mb-3 pb-3">
                <h1>Explore Top Destinations</h1>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="destination-item position-relative overflow-hidden mb-2">
                        <img class="img-fluid" src="img/coxs.jpg" alt=""/>
                        <a class="destination-overlay text-white text-decoration-none" href="">
                            <h5 class="text-white">Cox's Bazar</h5>
                        </a>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="destination-item position-relative overflow-hidden mb-2">
                        <img class="img-fluid" src="img/sundarban.jpg" alt=""/>
                        <a class="destination-overlay text-white text-decoration-none" href="">
                            <h5 class="text-white">Sundarbans</h5>
                        </a>
                    </div>
                </div>
               
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="destination-item position-relative overflow-hidden mb-2">
                        <img class="img-fluid" src="img/sylhet.jpg" alt=""/>
                        <a class="destination-overlay text-white text-decoration-none" href="">
                            <h5 class="text-white">Sylhet</h5>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>

    <div id="gtco-features">
		<div class="gtco-container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center gtco-heading animate-box">
					<h2>How It Works</h2>
					<p>Our system guides you to plan your trip according to your preferences in destinations and dates</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 col-sm-6">
					<div class="feature-center ">
						<span class="icon">
							<i>1</i>
						</span>
						<h3>Create A Planning Slot</h3>
						<p>Send Invitation through email to the desired trip members to plan collaborativelt.</p>
					</div>
				</div>
				<div class="col-md-4 col-sm-6">
					<div class="feature-center " >
						<span class="icon">
							<i>2</i>
						</span>
						<h3>Host Polls</h3>
						<p>Trip members can make polls to select final destination, dates accordingly. </p>
					</div>
				</div>
				<div class="col-md-4 col-sm-6">
					<div class="feature-center " >
						<span class="icon">
							<i>3</i>
						</span>
						<h3>Routes, Sight-seeing Suggestions and Overall Itinerary</h3>
						<p>Suitable routes, nearby places can be viewed. Finally an itinerary can be downloaded. </p>
					</div>
				</div>
				

			</div>
		</div>
	</div>
 
    
    <div id="about" class="counter">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-xl-6">
                    <div class="image-container">
                        <img class="img-fluid" src="img/sylhet.jpg" alt="alternative"/>
                    </div> 
                </div> 
                <div class="col-lg-7 col-xl-6">
                    <div class="text-container">
                        <div class="section-title">ABOUT</div>
                        <h2>We work to make your trips more enjoyable and easily managed.</h2>
                        <ul class="list-unstyled li-space-lg">
                            <li class="media">
                                <div class="media-body">Collaborative planning feature helps to plan a trip according to every trip members opinion</div>
                            </li>
                            <li class="media">
                                <div class="media-body">We believe, you'll enjoy planning your trip with us.</div>
                            </li>
                        </ul>

                       
                        <div id="counter">
                            <div class="cell">
                                <div class="counter-value number-count" data-count="231">1</div>
                                <div class="counter-info">Happy Users</div>
                            </div>
                            <div class="cell">
                                <div class="counter-value number-count" data-count="121">1</div>
                                <div class="counter-info">Successful Trips</div>
                            </div>
                            <div class="cell">
                                <div class="counter-value number-count" data-count="159">1</div>
                                <div class="counter-info">Good Reviews</div>
                            </div>
                        </div>
                        

                    </div>  
                </div> 
            </div> 
        </div> 
    </div> 

            <div id="services" class="basic-2"></div>
            <div class="cards-1">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title">SERVICES</div>
                            
                            
                            <div class="card">
                                <span class="fa-stack">
                                    <span class="hexagon"></span>
                                    <i class="fas fa-list-alt fa-stack-1x"></i>
                                </span>
                                <div class="card-body">
                                    <h4 class="card-title">Creating an Itinerary</h4>
                                    <p>Our system will give scope to download an itinerary once the planning is set.</p>
                                </div>
                            </div>
                    
                           
                        
                            <div class="card">
                                <span class="fa-stack">
                                    <span class="hexagon"></span>
                                    <i class="fas fa-map-marker-alt fa-stack-1x"></i>
                                </span>
                                <div class="card-body">
                                    <h4 class="card-title">Suitable Routes</h4>
                                    <p>After the destination of the trip is confirmed, suitable routes for that destination will be viewed.</p>
                                </div>
                            </div>
                            
        
        
                            
                            <div class="card">
                                <span class="fa-stack">
                                    <span class="hexagon"></span>
                                    
                                    <i class="fas fa-list-alt fa-stack-1x"></i>
                                </span>
                                <div class="card-body">
                                    <h4 class="card-title">Collaborative Planning</h4>
                                    <p>Trip planners can plan collaboratively in a planning slot.</p>
                                </div>
                            </div>
                            
                        </div>
                    
                    </div> 
                </div> 
            </div> 
        
            <h1 >What Our Users Say About Us...</h1>   
 <div class="rown">  
 <div class="columnn">                 
<figure class="snip1157">
  <blockquote>Great site to plan trips. Enoyed a lot!
    <div class="arrow"></div>
  </blockquote>
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg" alt="sq-sample3" />
  <div class="author">
    <h5>Shaira Sadia <span> Chittagong</span></h5>
  </div>
</figure></div>

<div class="columnn">  
<figure class="snip1157 hover">
  <blockquote> Will surely reccommend it to my friends. 
    <div class="arrow"></div>
  </blockquote>
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample27.jpg" alt="sq-sample27" />
  <div class="author">
    <h5>Tohfa<span><p>Khulna</p></span></h5>
  </div>
</figure>
</div>

<div class="columnn">  
<figure class="snip1157">
  <blockquote>Bon Voyage is a great site for trip planning.
    <div class="arrow"></div>
  </blockquote>
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample17.jpg" alt="sq-sample17" />
  <div class="author">
    <h5>Turna<span><p>Dhaka</p></span></h5>
  </div>
</figure>
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
    
    


    
        
</body>
           
        
        )

        
    }
}

export default HomePage;