export const stopCoordinates = {
  // Major Hubs & Colombo Center
  "pettah": [6.9333, 79.8500],
  "colombo fort": [6.9333, 79.8433],
  "town hall": [6.9155, 79.8636],
  "borella": [6.9142, 79.8781],
  "maradana": [6.9275, 79.8654],
  "demetagoda": [6.9312, 79.8803],
  "galle face": [6.9255, 79.8453],
  "kollupitiya": [6.9111, 79.8510],
  "bambalapitiya": [6.8902, 79.8550],
  "wellawatte": [6.8752, 79.8601],
  "dehiwala": [6.8511, 79.8652],
  "mount lavinia": [6.8370, 79.8643],
  "ratmalana": [6.8202, 79.8732],
  "moratuwa": [6.7730, 79.8816],
  "panadura": [6.7132, 79.9056],
  
  // High Level Road (138 Route)
  "kottava": [6.8415, 79.9654],
  "kottawa": [6.8415, 79.9654],
  "pannipitiya": [6.8435, 79.9472],
  "maharagama": [6.8511, 79.9212],
  "navinna": [6.8624, 79.9103],
  "delkanda": [6.8703, 79.8988],
  "nugegoda": [6.8711, 79.8887],
  "kirulapone": [6.8815, 79.8763],
  "havelock town": [6.8856, 79.8671],
  "thummulla": [6.8967, 79.8615],
  
  // 120 Route
  "kesbewa": [6.7865, 79.9515],
  "piliyandala": [6.8016, 79.9221],
  "boralesgamuwa": [6.8317, 79.8973],
  "kohuwala": [6.8655, 79.8761],
  
  // Negombo Road
  "katunayake": [7.1672, 79.8872],
  "seeduwa": [7.1068, 79.8797],
  "ja-ela": [7.0805, 79.8906],
  "kandana": [7.0514, 79.8943],
  "wattala": [6.9856, 79.8931],
  "peliyagoda": [6.9532, 79.8837],
  
  // Kandy Road
  "kiribathgoda": [6.9760, 79.9287],
  "kadawatha": [7.0016, 79.9500],
  "nittambuwa": [7.1437, 80.0967],
  "kegalle": [7.2513, 80.3462],
  "peradeniya": [7.2687, 80.5971],
  "kandy": [7.2906, 80.6337],
  
  // Others
  "angulana": [6.8041, 79.8775],
  "nawala": [6.8930, 79.8885],
  "rajagiriya": [6.9090, 79.8940],
  "battaramulla": [6.9000, 79.9195],
  "kaduwela": [6.9329, 79.9840],
  "angoda": [6.9248, 79.9181],
  "mattakkuliya": [6.9744, 79.8727],
  "hettiyawatte": [6.9582, 79.8654],
  "karagampitiya": [6.8584, 79.8690],
  "soysapura": [6.8091, 79.8795],
  "homagama": [6.8412, 80.0031],
  "godagama": [6.8427, 80.0214],
  "meegoda": [6.8533, 80.0465]
};

export const getCoordinates = (stopName) => {
  if (!stopName) return null;
  const normalized = stopName.toLowerCase();
  return stopCoordinates[normalized] || null;
};
