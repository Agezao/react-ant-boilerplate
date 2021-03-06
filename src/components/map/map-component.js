import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    {props.isMarkerShown && <Marker position={{ lat: -34.001, lng: 150.644 }} />}
    {props.isMarkerShown && <Marker position={{ lat: -34.001, lng: 150.344 }} />}
  </GoogleMap>
))

export default MapComponent;