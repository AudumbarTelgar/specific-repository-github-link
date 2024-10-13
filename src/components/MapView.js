import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px',
  marginTop: '10px',
};

function MapView({ lat, lng }) {
  const center = { lat, lng };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;
