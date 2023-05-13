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

    const destinationLabel = "Destination: ";
    const destination = itineraryData.destination;
    const data = destinationLabel + destination;

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.text(data, 20, 20); // Add your text on top of the image

    doc.save(fileName);
  }
}


  render() {
    return (
      <div>
        {this.state.itineraryData ? (
          <div>
            <p>{this.state.itineraryData.destination}</p>
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
