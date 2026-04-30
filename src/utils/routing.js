import { busRoutes, normalize } from '../data/network';

export function findRoute(startLocation, endLocation) {
  const start = normalize(startLocation);
  const end = normalize(endLocation);

  if (!start || !end) return { error: "Please enter both locations." };
  if (start === end) return { error: "Start and end locations cannot be the same." };

  // 1. Check for Direct Routes
  let directRoutes = [];
  
  for (const route of busRoutes) {
    const normStops = route.stops.map(normalize);
    const startIndex = normStops.indexOf(start);
    const endIndex = normStops.indexOf(end);

    // If both stops exist on this route and start comes before end (or we just allow both directions)
    if (startIndex !== -1 && endIndex !== -1) {
      // Calculate basic time
      const stopsCount = Math.abs(endIndex - startIndex);
      const estTime = stopsCount * route.timeBetweenStops;
      
      directRoutes.push({
        type: 'direct',
        routeId: route.id,
        routeName: route.name,
        startStop: route.stops[startIndex],
        endStop: route.stops[endIndex],
        stopsCount,
        estTime,
        direction: startIndex < endIndex ? 'Forward' : 'Backward'
      });
    }
  }

  if (directRoutes.length > 0) {
    return { success: true, routes: directRoutes };
  }

  // 2. Check for 1-Transfer Routes
  let transferRoutes = [];

  // Find all routes that contain the start location
  const startRoutes = busRoutes.filter(r => r.stops.map(normalize).includes(start));
  // Find all routes that contain the end location
  const endRoutes = busRoutes.filter(r => r.stops.map(normalize).includes(end));

  for (const sRoute of startRoutes) {
    for (const eRoute of endRoutes) {
      if (sRoute.id === eRoute.id) continue;

      // Find intersection points (transfer stops)
      const sStops = sRoute.stops.map(normalize);
      const eStops = eRoute.stops.map(normalize);
      
      const intersections = sStops.filter(stop => eStops.includes(stop));

      if (intersections.length > 0) {
        // Just take the first common stop for simplicity
        const transferStopNorm = intersections[0];
        
        const startIdx1 = sStops.indexOf(start);
        const transIdx1 = sStops.indexOf(transferStopNorm);
        const stopsCount1 = Math.abs(transIdx1 - startIdx1);
        
        const transIdx2 = eStops.indexOf(transferStopNorm);
        const endIdx2 = eStops.indexOf(end);
        const stopsCount2 = Math.abs(endIdx2 - transIdx2);

        // Get original capitalized name of transfer stop
        const transferStopOriginal = sRoute.stops[transIdx1];
        
        const totalTime = (stopsCount1 * sRoute.timeBetweenStops) + (stopsCount2 * eRoute.timeBetweenStops) + 10; // +10 mins for waiting

        transferRoutes.push({
          type: 'transfer',
          leg1: {
            routeId: sRoute.id,
            routeName: sRoute.name,
            startStop: sRoute.stops[startIdx1],
            endStop: transferStopOriginal,
            time: stopsCount1 * sRoute.timeBetweenStops
          },
          leg2: {
            routeId: eRoute.id,
            routeName: eRoute.name,
            startStop: transferStopOriginal,
            endStop: eRoute.stops[endIdx2],
            time: stopsCount2 * eRoute.timeBetweenStops
          },
          totalTime,
          transferStop: transferStopOriginal
        });
      }
    }
  }

  if (transferRoutes.length > 0) {
    // Sort by fastest time
    transferRoutes.sort((a, b) => a.totalTime - b.totalTime);
    return { success: true, routes: [transferRoutes[0]] }; // Return best transfer route
  }

  return { error: "No routes found between these locations in our current network." };
}
