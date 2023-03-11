import React from 'react';
 //import './HomeCss/styles.css';
 import './HomeCss/swiper.css';
 import './HomeCss/bootstrap.css';
 import './HomeCss/bootstrap.min.css';
 import './HomeCss/magnific-popup.css';
 import './HomeCss/fontawesome-all.css';
 import './assets/css/hover-min.css';
 import './assets/css/datepicker.css';
 
 import './assets/css/bootstrap.min.css';
 import './assets/css/bootsnav.css';
 //import './assets/css/style.css';
 import './assets/css/responsive.css';
 import './assets/css/animate.css';
 import './assets/css/font-awesome.min.css';

 class TripPlan extends React.Component{

    render(){

        return(
             <div class="planbody">
    
    
	{/* <div class="spinner-wrapper">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div> */}
  

   
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
                    <a class="nav-link" href="user_creation\login.html">SIGN UP</a>
                    
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
                        
                    </div> 
                </div> 
            </div> 
        </div>
    </header> 

<section  class="travel-box">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="single-travel-boxes">
                    <div id="desc-tabs" class="desc-tabs">

                       
                        
                        <div class="tab-content">

                            <div role="tabpanel" class="tab-pane active fade in" id="tours">
                                <div class="tab-para">

                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                            <div class="single-tab-select-box">

                                                <h2>destination</h2>

                                                <div class="travel-select-icon">
                                                    <select class="form-control ">

                                                          <option value="default">enter your starting location</option>

                                                          <option value="turkey">Chittagong</option>

                                                          <option value="russia">Sylhet</option>
                                                          <option value="egept">Rajshahi</option>

                                                    </select>
                                                </div>

                                               

                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="single-tab-select-box">
                                                <h2>Starting Date</h2>
                                                <div class="travel-check-icon">
                                                    <form action="#">
                                                        <input type="text" name="check_in" class="form-control" data-toggle="datepicker" placeholder="12 -01 - 2017 "/>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="single-tab-select-box">
                                                <h2>Ending Date</h2>
                                                <div class="travel-check-icon">
                                                    <form action="#">
                                                        <input type="text" name="check_out" class="form-control"  data-toggle="datepicker" placeholder="22 -01 - 2017 "/>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-1 col-sm-4">
                                            <div class="single-tab-select-box">
                                                <h2>Adult</h2>
                                                <div class="travel-select-icon">
                                                    <select class="form-control ">

                                                          <option value="default">5</option>

                                                          <option value="10">10</option>

                                                          <option value="15">15</option>
                                                          <option value="20">20</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-1 col-sm-4">
                                            <div class="single-tab-select-box">
                                                <h2>Childern</h2>
                                                <div class="travel-select-icon">
                                                    <select class="form-control ">

                                                          <option value="default">1</option>

                                                          <option value="2">2</option>

                                                          <option value="4">4</option>
                                                          <option value="8">8</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-sm-5">
                                            <div class="travel-budget">
                                                <div class="row">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clo-sm-7">
                                            <div class="about-btn travel-mrt-0 pull-right">
                                                <button  class="about-view travel-btn">
                                                    Create Planning Slot	
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</div>

</section>
    
      
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

    
    
 
</div>
        )
    }
 }

 export default TripPlan;