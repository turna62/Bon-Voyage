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

  //const img = new Image();
  //img.src = "" ; 
  //img.onload = function() {
    // const canvas = document.createElement("canvas");
    // canvas.width = img.width;
    // canvas.height = img.height;
    // const ctx = canvas.getContext("2d");
    // ctx.drawImage(img, 0, 0);
    // const dataUrl = canvas.toDataURL("image/jpeg");

    // // Add image as background
    // doc.addImage(dataUrl, "JPEG", 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

    itineraryData.days.forEach((day, index) => {
      const yOffset = index * 30 + 20; // Adjust the y-offset as needed
      doc.text(`Day ${day.day}`, 20, yOffset);
      doc.text(`Spots: ${day.spots.join(", ")}`, 20, yOffset + 30);
      doc.text(`Activities: ${day.activities.join(", ")}`, 20, yOffset + 20);
      
      doc.text(`Description: ${day.description}`, 20, yOffset + 10);
    });


    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Set text color to white
    //doc.text(data, 20, 20); // Add your text on top of the image

    doc.save(fileName);
  //}
}


  render() {
    const { itineraryData } = this.state;

    return (
      <div>
      {itineraryData ? (
        <div>
          {itineraryData.days.map((day, index) => (
            <div key={index}>
              <p>Day {day.day}</p>
            
              <p>Spots:</p>
              <ul>
                  {day.spots.map((spot, spotIndex) => (
                    <li key={spotIndex}>{spot}</li>
                  ))}
                </ul>
                <p>Activities: {day.activities.join(', ')}</p>
                <p>Description: {day.description}</p>

            </div>
          ))}
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={this.handleDownload}>Download Itinerary</button>
        </div>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div>
    );
  }
}
 
export default MyItinerary;
