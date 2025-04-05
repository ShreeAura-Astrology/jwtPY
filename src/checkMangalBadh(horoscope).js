function checkMarsBadh(horoscope) {
    // Check if the horoscope object is valid and contains necessary data
    if (!horoscope || typeof horoscope !== 'object') {
      console.error("Invalid horoscope input.");
      return false;
    }
  
    const { Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu } = horoscope;
  
    // Helper function to check if planets are in specific houses
    const isInHouse = (planet, houses) => houses.includes(horoscope[planet]);
  
    // Helper function to check if two planets are together (in the same house)
    const areTogether = (planet1, planet2) => horoscope[planet1] === horoscope[planet2];
  
    // Check for Automatic Cancellation (Mars Baddh Ka Parihaar) [1]
    if (areTogether('Sun', 'Mercury')) {
      return false; // Sun + Mercury together (Mars nek hota hai) [1]
    }
    if (areTogether('Mars', 'Mercury') && isInHouse('Mars', )) {
      return false; // Mars + Mercury in the 8th house together [1]
    }
    if (isInHouse('Sun', [1]) && isInHouse('Mercury', [1])) {
      return false; // Sun Mercury in the 3rd house [1]
    }
    if (isInHouse('Moon', [1])) {
      return false; // Moon in the 3rd house [1]
    }
    if (isInHouse('Moon', [1-4])) {
      return false; // Moon in the 1st, 2nd, 3rd, 4th, 8th, or 9th house [1]
    }
    // Note: The condition about Sun or Moon assisting Mars is too vague to implement directly [1].
  
    // Check for Mars Baddh conditions [2, 3]
    if (
      (Sun === Saturn) || // Sun + Saturn together anywhere [2]
      (Mercury === 6 && Ketu === 6) || // Mercury + Ketu in the 6th House [2]
      areTogether('Mars', 'Mercury') || // Mars + Mercury together anywhere [2]
      areTogether('Mars', 'Ketu') || // Mars + Ketu together anywhere [2]
      isInHouse('Ketu', [2]) || // Ketu in the 1st or 8th house [2]
      isInHouse('Mars', [1]) || // Mars in the 3rd house [2]
      isInHouse('Venus', ) || // Venus in the 9th house [2]
      isInHouse('Sun', ) || // Sun in the 6th, 7th, 10th, 12th house [3]
      isInHouse('Mars', ) || // Mars in the 6th house [3]
      isInHouse('Mercury', [1, 2]) || // Mercury in the 1st, 3rd or 8th house [3]
      isInHouse('Rahu', [5]) || // Rahu in the 5th or 9th house [3]
      isInHouse('Moon', ) || // Moon in the 12th house [3]
      isInHouse('Ketu', [1]) || // Ketu in the 3rd house [3]
      areTogether('Mercury', 'Venus') || // Mercury + Venus together [3]
      isInHouse('Sun', ) || // Sun in the 8th house [3]
      isInHouse('Jupiter', ) // Jupiter in the 7th house [3]
      // Note: The condition about Sun and Moon not assisting Mars is too vague to implement directly [3].
    ) {
      return true; // Mars Baddh is present
    }
  
    return false; // Mars Baddh is not present based on the conditions checked
  }
  
  function getPlanetHouses(houses){
    var planetSnapShot = {
        Sun: 1,
        Moon: 2,
        Mars: 3,
        Mercury: 4,
        Jupiter: 5,
        Venus: 6,
        Saturn: 1,
        Rahu: 8,
        Ketu: 2,
      };
    for (const house in houses) {
        for(planet in planetSnapShot)
        if(houses[house].planets.includes(planet)){
            planetSnapShot.planet = house;
        }
    }
    console.log(planetSnapShot);
    checkMarsBadh(planetSnapShot);
  }

  var houses = {
    "1": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "2": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "3": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "4": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "5": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "6": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "7": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "8": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "9": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "10": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "11": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    },
    "12": {
        "status": "N",
        "struggle": "",
        "rakesheffect": false,
        "planets": []
    }
};
  // Example usage:
  const horoscope1 = {
    Sun: 1,
    Moon: 2,
    Mars: 3,
    Mercury: 4,
    Jupiter: 5,
    Venus: 6,
    Saturn: 1,
    Rahu: 8,
    Ketu: 2,
  };
  
  const horoscope2 = {
    Sun: 3,
    Moon: 1,
    Mars: 5,
    Mercury: 3,
    Jupiter: 9,
    Venus: 11,
    Saturn: 7,
    Rahu: 2,
    Ketu: 8,
  };
  
  const horoscope3 = {
    Sun: 1,
    Moon: 2,
    Mars: 5,
    Mercury: 1,
    Jupiter: 9,
    Venus: 11,
    Saturn: 7,
    Rahu: 2,
    Ketu: 8,
  };