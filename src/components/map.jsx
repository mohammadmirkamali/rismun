import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "80%",
  height: "80%"
};

class Map1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      selectedPlace: "",
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 35.786279, longitude: 51.417885 },
        { latitude: 35.783241, longitude: 51.423207 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 }
      ]
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lng: position.coords.longitude,
        lat: position.coords.latitude
      });
    });
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          onClick={() => console.log("You clicked me!", index)}
        />
      );
    });
  };

  render() {
    const { lng, lat } = this.state;

    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        center={{ lat, lng }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: " AIzaSyD4BJz_0ACNuU76Uw0K3E6-RfqSt40DJ70"
})(Map1);
