import { busRoutes, normalize } from '../data/network';

export function findRoute(startLocation, endLocation) {
  const start = normalize(startLocation);
  const end = normalize(endLocation);

  if (!start || !end) return { error: "Please enter both locations." };
  if (start === end) return { error: "Start and end locations cannot be the same." };

  let allRoutes = [];

  // 1. Check for Direct Routes
  for (const route of busRoutes) {
    const normStops = route.stops.map(normalize);
    const startIndex = normStops.indexOf(start);
    const endIndex = normStops.indexOf(end);

    if (startIndex !== -1 && endIndex !== -1) {
      const stopsCount = Math.abs(endIndex - startIndex);
      const estTime = stopsCount * route.timeBetweenStops;
      
      allRoutes.push({
        type: 'direct',
        routeId: route.id,
        routeName: route.name,
        startStop: route.stops[startIndex],
        endStop: route.stops[endIndex],
        stopsCount,
        totalTime: estTime, // use totalTime for consistent sorting
        estTime,
        direction: startIndex < endIndex ? 'Forward' : 'Backward'
      });
    }
  }

  // 2. Check for 1-Transfer Routes
  const startRoutes = busRoutes.filter(r => r.stops.map(normalize).includes(start));
  const endRoutes = busRoutes.filter(r => r.stops.map(normalize).includes(end));

  for (const sRoute of startRoutes) {
    for (const eRoute of endRoutes) {
      if (sRoute.id === eRoute.id) continue;

      const sStops = sRoute.stops.map(normalize);
      const eStops = eRoute.stops.map(normalize);
      
      const intersections = sStops.filter(stop => eStops.includes(stop));

      if (intersections.length > 0) {
        const transferStopNorm = intersections[0];
        
        const startIdx1 = sStops.indexOf(start);
        const transIdx1 = sStops.indexOf(transferStopNorm);
        const stopsCount1 = Math.abs(transIdx1 - startIdx1);
        
        const transIdx2 = eStops.indexOf(transferStopNorm);
        const endIdx2 = eStops.indexOf(end);
        const stopsCount2 = Math.abs(endIdx2 - transIdx2);

        const transferStopOriginal = sRoute.stops[transIdx1];
        
        const totalTime = (stopsCount1 * sRoute.timeBetweenStops) + (stopsCount2 * eRoute.timeBetweenStops) + 10;

        // Prevent adding transfer routes if a direct route is already much faster
        // But for comprehensive options, let's add them anyway and sort.
        allRoutes.push({
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

  if (allRoutes.length > 0) {
    // Sort by fastest time and take top 3
    allRoutes.sort((a, b) => a.totalTime - b.totalTime);
    
    // De-duplicate similar routes (same start and end route IDs for transfers)
    const uniqueRoutes = [];
    const seenSignatures = new Set();
    
    for (const r of allRoutes) {
      const sig = r.type === 'direct' ? r.routeId : `${r.leg1.routeId}-${r.leg2.routeId}`;
      if (!seenSignatures.has(sig)) {
        seenSignatures.add(sig);
        uniqueRoutes.push(r);
      }
    }

    return { success: true, routes: uniqueRoutes.slice(0, 3) };
  }

  return { error: "No routes found between these locations in our current network." };
}
