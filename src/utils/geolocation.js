import { stopCoordinates } from '../data/coordinates';

// Haversine formula to calculate distance between two lat/lng points in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

export function getNearestStop() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let nearestStop = null;
        let minDistance = Infinity;

        // Iterate through all known stop coordinates
        for (const [stopKey, coords] of Object.entries(stopCoordinates)) {
          const dist = calculateDistance(latitude, longitude, coords[0], coords[1]);
          if (dist < minDistance) {
            minDistance = dist;
            nearestStop = stopKey;
          }
        }

        if (nearestStop) {
          // Capitalize the first letter of each word to return nicely formatted name
          const formattedName = nearestStop.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          resolve({ stopName: formattedName, distance: minDistance });
        } else {
          reject(new Error("No stops found near your location"));
        }
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
