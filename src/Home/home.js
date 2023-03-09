import React from 'react';
 import './HomeCss/styles.css';
 import './HomeCss/swiper.css';
 import './HomeCss/bootstrap.css';
 import './HomeCss/bootstrap.min.css';
 import './HomeCss/magnific-popup.css';
 import './HomeCss/fontawesome-all.css';
 import './css1/style.css';
 

class HomePage extends React.Component{
    render(){

        return(


            <body data-spy="scroll" data-target=".fixed-top">
    

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
                            <a class="nav-link" href="user_creation\login.html">Sign Up</a>
                            
                        </li>

                        <li class="nav-item-search">
                    
                    <butaton type="button" class="btn text-light ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fa fa-search"></i></butaton>
                    
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
                                    <h1>Bon <span id="js-rotating">Voyage, Voyage!, VOYAGE!</span></h1>
                                    <p class="p-heading p-large">The journey of a thousand miles begins with a single step.</p>
                                    <a class="btn-solid-lg page-scroll" href="#intro">Plan A Trip</a>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
            </header> 
            
        
            <div id="about" class="counter">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 col-xl-6">
    <div id="counter">
        <div class="cell">
            <div class="counter-value number-count" data-count="231">1</div>
            <div class="counter-info">HappyUsers</div>
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

{/* <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
         */}
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
                                <img class="img-fluid" src="images/intro-office.jpg" alt="alternative"/>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            
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
					<div class="feature-center animate-box" data-animate-effect="fadeIn">
						<span class="icon">
							<i>1</i>
						</span>
						<h3>Create A Planning Slot</h3>
						<p>Send Invitation through email to the desired trip members to plan collaborativelt.</p>
					</div>
				</div>
				<div class="col-md-4 col-sm-6">
					<div class="feature-center animate-box" data-animate-effect="fadeIn">
						<span class="icon">
							<i>2</i>
						</span>
						<h3>Host Polls</h3>
						<p>Trip members can make polls to select final destination, dates accordingly. </p>
					</div>
				</div>
				<div class="col-md-4 col-sm-6">
					<div class="feature-center animate-box" data-animate-effect="fadeIn">
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