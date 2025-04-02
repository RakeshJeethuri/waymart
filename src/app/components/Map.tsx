'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const servicePoints = [
  { name: 'Mumbai Service Point', position: [19.076, 72.8777] },
  { name: 'Delhi Service Point', position: [28.7041, 77.1025] },
  { name: 'Bangalore Service Point', position: [12.9716, 77.5946] },
  { name: 'Hyderabad Service Point', position: [17.385, 78.4867] },
  { name: 'Kurnool Service Point', position: [15.8281, 78.0373] },
  { name: 'Visakhapatnam Service Point', position: [17.6868, 83.2185] },
];

const createCustomIcon = () => {
  return L.divIcon({
    html: `<div>🚩</div>`,
    className: 'custom-marker-icon',
    iconSize: [30, 42],
    iconAnchor: [10, 33],
    popupAnchor: [0, -42],
  });
};

export default function Map() {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {servicePoints.map((point, index) => (
        <Marker key={index} position={point.position} icon={createCustomIcon()}>
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
