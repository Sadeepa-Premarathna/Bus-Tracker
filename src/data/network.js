export const busRoutes = [
  {
    id: "138",
    name: "Maharagama - Pettah",
    stops: [
      "Maharagama",
      "Navinna",
      "Delkanda",
      "Nugegoda",
      "Kirulapone",
      "Havelock Town",
      "Thummulla",
      "Town Hall",
      "Maradana",
      "Pettah"
    ],
    timeBetweenStops: 5
  },
  {
    id: "120",
    name: "Kesbewa - Pettah",
    stops: [
      "Kesbewa",
      "Piliyandala",
      "Boralesgamuwa",
      "Kohuwala",
      "Havelock Town",
      "Thummulla",
      "Town Hall",
      "Pettah"
    ],
    timeBetweenStops: 6
  },
  {
    id: "154",
    name: "Angulana - Kiribathgoda",
    stops: [
      "Angulana",
      "Mount Lavinia",
      "Dehiwala",
      "Wellawatte",
      "Bambalapitiya",
      "Kollupitiya",
      "Town Hall",
      "Borella",
      "Demetagoda",
      "Peliyagoda",
      "Kiribathgoda"
    ],
    timeBetweenStops: 7
  },
  {
    id: "17",
    name: "Panadura - Kandy",
    stops: [
      "Panadura",
      "Moratuwa",
      "Mount Lavinia",
      "Dehiwala",
      "Bambalapitiya",
      "Kollupitiya",
      "Pettah",
      "Peliyagoda",
      "Kadawatha",
      "Nittambuwa",
      "Kegalle",
      "Peradeniya",
      "Kandy"
    ],
    timeBetweenStops: 10
  },
  {
    id: "100",
    name: "Panadura - Pettah",
    stops: [
      "Panadura",
      "Moratuwa",
      "Ratmalana",
      "Mount Lavinia",
      "Dehiwala",
      "Wellawatte",
      "Bambalapitiya",
      "Kollupitiya",
      "Galle Face",
      "Pettah"
    ],
    timeBetweenStops: 6
  },
  {
    id: "101",
    name: "Moratuwa - Pettah",
    stops: [
      "Moratuwa",
      "Ratmalana",
      "Mount Lavinia",
      "Dehiwala",
      "Wellawatte",
      "Bambalapitiya",
      "Kollupitiya",
      "Galle Face",
      "Pettah"
    ],
    timeBetweenStops: 5
  },
  {
    id: "174",
    name: "Kottawa - Borella",
    stops: [
      "Kottawa",
      "Pannipitiya",
      "Maharagama",
      "Navinna",
      "Delkanda",
      "Nugegoda",
      "Nawala",
      "Rajagiriya",
      "Borella"
    ],
    timeBetweenStops: 5
  },
  {
    id: "176",
    name: "Karagampitiya - Hettiyawatte",
    stops: [
      "Karagampitiya",
      "Dehiwala",
      "Kohuwala",
      "Nugegoda",
      "Nawala",
      "Rajagiriya",
      "Borella",
      "Demetagoda",
      "Hettiyawatte"
    ],
    timeBetweenStops: 6
  },
  {
    id: "177",
    name: "Kaduwela - Kollupitiya",
    stops: [
      "Kaduwela",
      "Battaramulla",
      "Rajagiriya",
      "Borella",
      "Town Hall",
      "Kollupitiya"
    ],
    timeBetweenStops: 8
  },
  {
    id: "155",
    name: "Soysapura - Mattakkuliya",
    stops: [
      "Soysapura",
      "Moratuwa",
      "Mount Lavinia",
      "Dehiwala",
      "Wellawatte",
      "Bambalapitiya",
      "Town Hall",
      "Borella",
      "Demetagoda",
      "Mattakkuliya"
    ],
    timeBetweenStops: 7
  },
  {
    id: "134",
    name: "Angoda - Pettah",
    stops: [
      "Angoda",
      "Kotikawatta",
      "Orugodawatta",
      "Demetagoda",
      "Maradana",
      "Pettah"
    ],
    timeBetweenStops: 5
  },
  {
    id: "187",
    name: "Katunayake - Pettah",
    stops: [
      "Katunayake",
      "Seeduwa",
      "Ja-Ela",
      "Kandana",
      "Wattala",
      "Peliyagoda",
      "Pettah"
    ],
    timeBetweenStops: 8
  },
  {
    id: "190",
    name: "Meegoda - Pettah",
    stops: [
      "Meegoda",
      "Godagama",
      "Homagama",
      "Kottawa",
      "Pannipitiya",
      "Maharagama",
      "Nugegoda",
      "Kirulapone",
      "Havelock Town",
      "Town Hall",
      "Maradana",
      "Pettah"
    ],
    timeBetweenStops: 6
  }
];

// Helper to normalize stop names for search
export const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
