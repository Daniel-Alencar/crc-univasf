// components/Map.tsx
'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type MapProps = {
  apiKey: string;
};

const containerStyle = {
  width: '100%',
  height: '200px',
};


const center = {
  lat: -9.4484224,
  lng: -40.5270342,
};

export default function Map({ apiKey }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
