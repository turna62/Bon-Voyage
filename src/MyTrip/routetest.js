import React, { Component } from 'react';

class ViewRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: '',
      dest: '',
    };

    this.map = null;
    this.directionsService = null;
    this.directionsRenderer = null;
    this.sourceAutocomplete = null;
    this.desAutocomplete = null;

    this.initMap = this.initMap.bind(this);
    this.caclRoute = this.caclRoute.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 13,
    });

    window.google.maps.event.addListener(this.map, 'click', function (event) {
      this.setOptions({ scrollwheel: true });
    });

    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsRenderer = new window.google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    this.sourceAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById('source'));
    this.desAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById('dest'));
  }

  caclRoute() {
    const { source, dest } = this.state;

    const request = {
      origin: source,
      destination: dest,
      travelMode: 'DRIVING',
    };

    this.directionsService.route(request, function (result, status) {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Directions route finder</h1>
        <br /><br />
        <div className="container">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Source Location" id="source" onChange={(e) => this.setState({ source: e.target.value })} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Destination Location" id="dest" onChange={(e) => this.setState({ dest: e.target.value })} />
          </div>
          <button onClick={this.caclRoute} className="btn btn-primary">Get Directions</button>
          <div id="map" style={{ height: '500px', width: '100%' }}></div>
        </div>
      </div>
    );
  }
}

export default ViewRoutes;
