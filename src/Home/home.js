import React from 'react';
 import './HomeCss/styles.css';
 import './HomeCss/swiper.css';
 import './HomeCss/bootstrap.css';
 import './HomeCss/bootstrap.min.css';
 //import './HomeCss/magnific-popup.css';
 //import './HomeCss/fontawesome-all.css';
 import './css1/style.css';
 

class HomePage extends React.Component{
    render(){

        return(


            <body class="homebody">
    

             {/* <div class="spinner-wrapper">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
             */}
        
            
            <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                
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
                            <a class="nav-link" href="http://localhost:3000/sign-up">SIGN UP</a>
                            
                        </li>

                        <li class="nav-item-search">
                    
                            <butaton type="button" class="btn text-light ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="bi bi-search"></i></butaton>
                    
                      </li>
                  </ul>
                            
              </div>
         </nav> 
        
    <div class="modal fade" id="searchModal" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex align-items-center justify-content-center">
                    <div class="input-group">
                        <input type="text" class="form-control bg-transparent border-light p-3" placeholder="Type search keyword"/>
                        <button class="btn btn-success px-4 border-light"><i class="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

        
            <header id="header" class="header">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-container">
                                    <h1>Bon <span id="js-rotating">VOYAGE!</span></h1>
                                    <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p>
                                    <a class="btn-solid-lg page-scroll" href="http://localhost:3000/planatrip">Plan A Trip</a>

                                    <form class="search" action="">
                                      <input class="searchi" type="search" placeholder="Search here..." required/>
                                      <button class="searchbtn" type="submit">Search</button>
                                  </form>  

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
                                <h2>We Offer The Opportunity To Plan Your Trip Collaboratively! </h2>
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
                <h1>Explore Top Destination</h1>
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
					<p>Our system guides you to plan your trip according to your preferences in destination, date, members.</p>
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
                        <img class="img-fluid" src="images/about.jpg" alt="alternative"/>
                    </div> 
                </div> 
                <div class="col-lg-7 col-xl-6">
                    <div class="text-container">
                        <div class="section-title">ABOUT</div>
                        <h2>We're Passionate About Delivering Growth Services</h2>
                        <p>Our goal is to provide the right business growth services at the appropriate time so companies can benefit from the created momentum and thrive for a long period of time</p>
                        <ul class="list-unstyled li-space-lg">
                            <li class="media">
                                <i class="fas fa-square"></i>
                                <div class="media-body">Everything we recommend has direct positive impact</div>
                            </li>
                            <li class="media">
                                <i class="fas fa-square"></i>
                                <div class="media-body">You will become an important partner of our company</div>
                            </li>
                        </ul>

                       
                        <div id="counter">
                            <div class="cell">
                                <div class="counter-value number-count" data-count="231">1</div>
                                <div class="counter-info">Happy Users</div>
                            </div>
                            <div class="cell">
                                <div class="counter-value number-count" data-count="121">1</div>
                                <div class="counter-info">Issues Solved</div>
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
        
    <div class="slider">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2>What users say about us...</h2>
                </div> 
            </div>
            <div class="row">
                <div class="col-lg-12">

                    
                    <div class="slider-container">
                        <div class="swiper-container card-slider">
                            <div class="swiper-wrapper">
                                
                                
                                <div class="swiper-slide">
                                    <div class="card">
                                        <img class="card-image" src="images/testimonial-1.jpg" alt="alternative"/>
                                        <div class="card-body">
                                            <div class="testimonial-text">Great site to plan trip. Will surely recommend.</div>
                                            <div class="testimonial-author">Shaira Sadia</div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="swiper-slide">
                                    <div class="card">
                                        <img class="card-image" src="images/testimonial-2.jpg" alt="alternative"/>
                                        <div class="card-body">
                                            <div class="testimonial-text">I purchased the Growth Accelerator service pack a few years ago and I renewed the contract each year. </div>
                                            <div class="testimonial-author">Marsha Singer - Marketer</div>
                                        </div>
                                    </div>        
                                </div> 
                                <div class="swiper-slide">
                                    <div class="card">
                                        <img class="card-image" src="images/testimonial-3.jpg" alt="alternative"/>
                                        <div class="card-body">
                                            <div class="testimonial-text">Aria's CEO personally attends client meetings and gives his feedback on business growth strategies.</div>
                                            <div class="testimonial-author">Roy Smith - Developer</div>
                                        </div>
                                    </div>        
                                </div>
                                <div class="swiper-slide">
                                    <div class="card">
                                        <img class="card-image" src="images/testimonial-4.jpg" alt="alternative"/>
                                        <div class="card-body">
                                            <div class="testimonial-text">At the beginning I thought the prices are a little high for what they offer but they over deliver each and every time.</div>
                                            <div class="testimonial-author">Ronald Spice - Owner</div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="swiper-slide">
                                    <div class="card">
                                        <img class="card-image" src="images/testimonial-5.jpg" alt="alternative"/>
                                        <div class="card-body">
                                            <div class="testimonial-text">I recommend Aria to every business owner or growth leader that wants to take his company to the next level.</div>
                                            <div class="testimonial-author">Lindsay Rune - Manager</div>
                                        </div>
                                    </div>        
                                </div> 
                                <div class="swiper-slide">
                                    <div class="card">
                                        <img class="card-image" src="images/testimonial-6.jpg" alt="alternative"/>
                                        <div class="card-body">
                                            <div class="testimonial-text">My goals for using Aria's services seemed high when I first set them but they've met them with no problems.</div>
                                            <div class="testimonial-author">Ann Black - Consultant</div>
                                        </div>
                                    </div>        
                                </div> 
                            
                            </div> 
        
                            
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                            
        
                        </div> 
                    </div>
                </div> 
            </div> 
        </div> 
    </div> 


                
            <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="text-container about">
                                <h4></h4>
                                <p class="white"></p>
                            </div> 
                        </div> 
                        <div class="col-md-2">
                            <div class="text-container">
                                <h4>Help</h4>
                                <ul class="list-unstyled li-space-lg white">
                                   <li>
        
                                   </li>
                                </ul>
                            </div> 
                        </div> 
                        <div class="col-md-2">
                            <div class="text-container">
                                <h4>Social Media</h4>
                                <ul class="list-unstyled li-space-lg">
                                    <li>
                                        
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