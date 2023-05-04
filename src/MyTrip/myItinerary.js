import { CSVLink } from 'react-csv';
import React from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

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

//csv
//   handleDownload = () => {
//     const data = [
//       ["Key", "Value"],
//       ...Object.entries(this.state.itineraryData || {})
//     ];
//     const fileName = "itineraryData.csv";
//     const headers = { "Content-Disposition": `attachment; filename="${fileName}"` };
//     const csvData = Papa.unparse({ fields: headers, data });
//     const blob = new Blob([csvData], { type: 'text/csv' });
//     const csvURL = URL.createObjectURL(blob);
    
//     const tempLink = document.createElement("a");
//     tempLink.href = csvURL;
//     tempLink.setAttribute("download", fileName);
//     tempLink.setAttribute("style", "display:none;");
//     tempLink.setAttribute("target", "_blank");
//     tempLink.setAttribute("rel", "noopener noreferrer");
//     Object.keys(headers).forEach((key) => {
//       tempLink.setAttribute(key, headers[key]);
//     });
  
//     document.body.appendChild(tempLink);
//     tempLink.click();
//     document.body.removeChild(tempLink);
//   }
  

// text
// handleDownload = () => {
//     const data = this.state.itineraryData;
  
//     const fileName = "itineraryData.txt";
//     const fileContents = JSON.stringify(data);
//     const headers = {
//       "Content-Type": "text/plain",
//       "Content-Disposition": `attachment; filename="${fileName}"`,
//     };
  
//     const blob = new Blob([fileContents], { type: "text/plain" });
  
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = fileName;
//     Object.keys(headers).forEach(key => link.setAttribute(key, headers[key]));
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
  

// 

handleDownload = () => {
    const { itineraryData } = this.state;
    const fileName = "Itinerary.pdf";
    const doc = new jsPDF();
  
    const destinationLabel = "Destination: ";
    const destination = itineraryData.destination;
    const data = destinationLabel + destination;
  
    doc.text(data, 10, 10);
    const url = doc.output('dataurlstring');
    
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
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
