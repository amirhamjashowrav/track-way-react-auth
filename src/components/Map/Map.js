import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  marginTop: '50px',
  marginLeft: '20px',
  borderRadius: '10px',
  width: '60%',
  height: '80%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 23.777176,
            lng: 90.399452
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA8VkRSFSnEanAmJ7kGM4-9vtTqdFI9np4'
})(MapContainer);