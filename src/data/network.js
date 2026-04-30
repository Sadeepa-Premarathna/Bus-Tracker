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
      "Town Hall",
      "Maradana",
      "Pettah"
    ],
    timeBetweenStops: 5 // rough estimate in mins
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
      "Town Hall",
      "Borella",
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
  }
];

// Helper to normalize stop names for search
export const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
