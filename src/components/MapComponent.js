import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { getCoordinates } from '../data/coordinates';

// Helper component to auto-zoom the map to fit all points
const MapBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      // Find bounding box
      const lats = positions.map(p => p[0]);
      const lngs = positions.map(p => p[1]);
      const bounds = [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)]
      ];
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
};

export default function MapComponent({ result }) {
  const defaultCenter = [6.9271, 79.8612]; // Colombo
  const [routePositions, setRoutePositions] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!result || !result.routes || result.routes.length === 0) {
      setRoutePositions([]);
      setMarkers([]);
      return;
    }

    // Just show the first best route on the map for clarity
    const bestRoute = result.routes[0];
    const newPositions = [];
    const newMarkers = [];

    if (bestRoute.type === 'direct') {
      const startCoord = getCoordinates(bestRoute.startStop);
      const endCoord = getCoordinates(bestRoute.endStop);
      
      if (startCoord) {
        newPositions.push(startCoord);
        newMarkers.push({ pos: startCoord, label: `Start: ${bestRoute.startStop}`, type: 'start' });
      }
      if (endCoord) {
        newPositions.push(endCoord);
        newMarkers.push({ pos: endCoord, label: `End: ${bestRoute.endStop}`, type: 'end' });
      }
    } else {
      const startCoord = getCoordinates(bestRoute.leg1.startStop);
      const transferCoord = getCoordinates(bestRoute.transferStop);
      const endCoord = getCoordinates(bestRoute.leg2.endStop);

      if (startCoord) {
        newPositions.push(startCoord);
        newMarkers.push({ pos: startCoord, label: `Start: ${bestRoute.leg1.startStop}`, type: 'start' });
      }
      if (transferCoord) {
        newPositions.push(transferCoord);
        newMarkers.push({ pos: transferCoord, label: `Transfer: ${bestRoute.transferStop}`, type: 'transfer' });
      }
      if (endCoord) {
        newPositions.push(endCoord);
        newMarkers.push({ pos: endCoord, label: `End: ${bestRoute.leg2.endStop}`, type: 'end' });
      }
    }

    setRoutePositions(newPositions);
    setMarkers(newMarkers);
  }, [result]);

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', marginTop: '2rem' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        style={{ height: '100%', width: '100%', backgroundColor: '#1a233a' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {routePositions.length > 1 && (
          <Polyline 
            positions={routePositions} 
            color="#00f0ff" 
            weight={4} 
            dashArray="10, 10" 
            opacity={0.8}
          />
        )}

        {markers.map((m, i) => (
          <Marker key={i} position={m.pos}>
            <Popup>
              <strong style={{color: '#000'}}>{m.label}</strong>
            </Popup>
          </Marker>
        ))}

        {routePositions.length > 0 && <MapBounds positions={routePositions} />}
      </MapContainer>
    </div>
  );
}
