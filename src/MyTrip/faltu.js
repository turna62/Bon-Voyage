import React from 'react';
import jsPDF from 'jspdf';
import './mytrip.css';

class MyItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      tripId: null, 
      itineraryId: null,
      itineraryData: null
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const tripId = params.get('tripId');
    const itineraryId = params.get('itineraryId');

    this.setState({ userId, tripId, itineraryId });

    fetch("http://localhost:5000/itineraryData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        itineraryId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "itineraryData");
        if (data.data === "Token Expired!") {
          alert("Token expired! Kindly login again.");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        } else {
          this.setState({ itineraryData: data.data });
        }
      });
  }
  
  
  handleDownload = () => {
    const { itineraryData } = this.state;
    const fileName = "Itinerary.pdf";
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });
  
    const img = new Image();
    img.src = "" ; 
    img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
  
      // Add image as background
      doc.addImage(dataUrl, "JPEG", 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
  
      // const destinationLabel = "Description: ";
      // const description = itineraryData.day.description;
      // const data = destinationLabel + description;


      const day = itineraryData.days.map(day => day.day);
      const spots = itineraryData.days.map(day => day.spots.join('\n'));
      const activities = itineraryData.days.map(day => day.activities);
      const description = itineraryData.days.map(day => day.description);
      
      const data = day.map((d, index) => `Day: ${d}\n\nSpots:\n${spots[index]}\n\nActivities: ${activities[index]}\n\nDescription: ${description[index]}`).join('\n\n');
      
doc.setFontSize(16);
doc.setTextColor(40,41, 41); // Set text color to white
doc.text(data, 20, 40); // Add your text on top of the image

doc.save(fileName);

    }
  }
  
  


  render() {
    const { itineraryData } = this.state;

    return (
      <div>
      <div class="download">
      <div class="iheading">
     <h3><i class="fa fa-anchor"></i> Bon Voyage!</h3>
     <h5>My Itinerary</h5>          
     </div>
      {itineraryData ? ( 
        <div class="itinfo">
          {itineraryData.days.map((day, index) => (
            <div key={index}>
              
              <p class="iday">Day {day.day} <i class="fa fa-calendar"></i></p><hr></hr>
            
              <p>Spots: 
                  {day.spots.map((spot, spotIndex) => (
                    <div class="dspot" key={spotIndex}>{spot}</div>
                  ))}
                
              </p>
                <div class="dact">Activities: {day.activities.join(', ')}</div>
                <div class="dact1">Description: {day.description}</div>

            </div>
          ))}
<button style={{ backgroundColor: 'rgb(14,44,44)', color: 'white', position: 'relative', right: '10px', bottom:'10px' }} onClick={this.handleDownload}>Download</button>

        </div>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div></div>
    );
  }
}
 
export default MyItinerary;
