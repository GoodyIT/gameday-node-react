exports.getColor = (data, key) => {
  if (['bb', 'era', 'whip'].indexOf(key) > -1) {
    return data[key].delta <= 0 ? '#13dd01' : '#ee0009';
  } else if (['rbi', 'tr', 'gb', 'ld'].indexOf(key) > -1) {
    return data[key].percentage > 0 ? '#13dd01' : '#ee0009';
  } else {
    return data[key].delta > 0 ? '#13dd01' : '#ee0009';
  }
};

exports.teamLookup = team => {
  const map = {
    'NOS': {
      location: 'NEW ORLEANS',
      mascot: 'Saints'
    },
    'DAL': {
      location: 'DALLAS',
      mascot: 'COWBOYS'
    },
    'DET': {
      location: 'DETROIT',
      mascot: 'LIONS'
    },
    'CAR': {
      location: 'CAROLINA',
      mascot: 'PANTHERS'
    },
    'LAR': {
      location: 'LOS ANGELES',
      mascot: 'RAMS'
    },
    'TBB': {
      location: 'TAMPA BAY',
      mascot: 'BUCCANEERS'
    },
    'ARI': {
      location: 'ARIZONA',
      mascot: 'CARDINALS'
    },
    'GBP': {
      location: 'GREEN BAY',
      mascot: 'PACKERS'
    },
    'DEN': {
      location: 'DENVER',
      mascot: 'BRONCOS'
    },
    'CIN': {
      location: 'CINCINNATI',
      mascot: 'BENGALS'
    },
    'BAL': {
      location: 'BALTIMORE',
      mascot: 'RAVENS'
    },
    'ATL': {
      location: 'ATLANTA',
      mascot: 'FALCONS'
    },
    'CHI': {
      location: 'CHICAGO',
      mascot: 'BEARS'
    },
    'NYG': {
      location: 'NEW YORK',
      mascot: 'GIANTS'
    },
    'CLE': {
      location: 'CLEVELAND',
      mascot: 'BROWNS'
    },
    'HOU': {
      location: 'HOUSTON',
      mascot: 'TEXANS'
    },
    'IND': {
      location: 'INDIANAPOLIS',
      mascot: 'COLTS'
    },
    'JAC': {
      location: 'JACKSONVILLE',
      mascot: 'JAGUARS'
    },
    'BUF': {
      location: 'BUFFALO',
      mascot: 'BILLS'
    },
    'MIA': {
      location: 'MIAMI',
      mascot: 'DOLPHINS'
    },
    'NYJ': {
      location: 'NEW YORK',
      mascot: 'JETS'
    },
    'TEN': {
      location: 'TENNESSEE',
      mascot: 'TITANS'
    },
    'KCC': {
      location: 'KANSAS CITY',
      mascot: 'CHIEFS'
    },
    'OAK': {
      location: 'OAKLAND',
      mascot: 'RAIDERS'
    },
    'MIN': {
      location: 'MINNESOTA',
      mascot: 'VIKINGS'
    },
    'NEP': {
      location: 'NEW ENGLAND',
      mascot: 'PATRIOTS'
    },
    'SFO': {
      location: 'SAN FRANCISCO',
      mascot: '49ERS'
    },
    'SEA': {
      location: 'SEATTLE',
      mascot: 'SEAHAWKS'
    },
    'LAC': {
      location: 'LOS ANGELES',
      mascot: 'CHARGERS'
    },
    'PIT': {
      location: 'PITTSBURGH',
      mascot: 'STEELERS'
    },
    'WAS': {
      location: 'WASHINGTON',
      mascot: 'REDSKINS'
    },
    'PHI': {
      location: 'PHILADELPHIA',
      mascot: 'EAGLES'
    },
  };
  return map[team];
};

exports.convertWindDirection = (windDirection, stadiumOrientaion) => {
  let diff = windDirection - stadiumOrientaion;
  diff = diff < 0 ? diff + 360 : diff;
  
  if (diff > 46 && diff < 135 || diff > 226 && diff < 315) {
    return 'cross';
  } else if (diff > 136 && diff < 225) {
    return 'in';
  } else if (diff > 316 || diff < 45) {
    return 'out';
  }
  return 'cross';
};

const cardinalDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

const degreesToCardinal = degrees => {
  return cardinalDirections[degrees];
};

const cardinalToDegrees = direction => {
  
  const map = cardinalDirections.reduce((acc, item, key) => {
    acc[item] = key;
    return acc;
  }, {});
  
  return map[direction];
};

exports.getRelativeWindDirection = (windDirection, orientation) => {
  let diff = cardinalToDegrees(windDirection) - orientation / 22.5;
  diff = diff < 0 ? diff + 16 : diff;
  return degreesToCardinal(diff);
};
