const Promise = require('bluebird');
const get = require('lodash/get');
const models = require('../../models');
const { teamLookup, getRelativeWindDirection } = require('../../utils');
const moment = require('moment-timezone');

exports.getStats = async (req, res) => {
  const startTime = new Date();

  let nflResults;

  try {
    nflResults = await models.sequelize.query(`SELECT * FROM nfl;`,
    {
      type: models.sequelize.QueryTypes.SELECT
    });
  } catch (err) {
    console.log(err);
  }

  console.log('====================', nflResults);

  const query = (game, includeWeather) => {
    return models.sequelize.query(
      `SELECT
      AVG(home_score + away_score) AS combined_score, 
      AVG(home_rush_yds + away_rush_yds) as total_rush_yds, 
      AVG(home_rush_attempts + away_rush_attempts) as total_rush_attempts,
      AVG(home_yds_per_carry + away_yds_per_carry) as total_yds_per_carry,
      AVG(passing_yds_home + passing_yds_away) as passing_yds_total,
      AVG(passing_attempts_home + passing_attempts_away) as passing_attempts_total,
      AVG(passing_completion_home + passing_completion_away) as passing_completion_total,
      AVG(passing_comp_pct_home + passing_comp_pct_away) as passing_comp_pct_total,
      AVG(turnovers_away + turnovers_home) AS turnovers_total, 
      AVG(passing_int_home + passing_int_away) as passing_int_total,
      AVG(fumbles_lost_away + fumbles_lost_home) AS fumbles_total,
      SUM(away_score + home_score) AS total_score,
      venue.lat, venue.lng, COUNT(DISTINCT game.id) as count, venue.name, venue.team,
      venue.roof as roof, venue.windDirection as orientation, COUNT(DISTINCT game.id) as count
        
      FROM game JOIN venue ON game.venue_id = venue.id
      ${includeWeather ? 'JOIN weather ON game.weather_id = weather.id' : ''}
      
      WHERE venue.name = :stadium
      ${includeWeather ?
      `AND
        (CASE WHEN :temp < 50 THEN weather.temp < 50
              WHEN :temp > 90 THEN weather.temp > 90
              ELSE weather.temp BETWEEN :temp - 4 AND :temp + 4
        END)
      	AND weather.dew_point BETWEEN :dewpoint - 4 AND :dewpoint + 4` : ''
      }
      GROUP BY venue.id
      ;`,
      {
        replacements: {
          stadium: game.stadium,
          temp: game.temp,
          dewpoint: game.dew_point,
          humidity: game.humidity,
        },
        type: models.sequelize.QueryTypes.SELECT,
      },
    );
  };
  
  console.info('Fetching data');
  let results = [];
  await Promise.map(nflResults, async game => {
    if (game.temp) {
      const q1 = await query(game, true);
      const q2 = await query(game, false);
      await Promise.join(q1, q2, (statsWithWeather, statsWithoutWeather) => {
        const endTime = new Date();
        console.info('Received data: ' + (endTime.getTime() - startTime.getTime()) / 1000 + ' s');
        const data = statsWithWeather[0] || {};
        const dataWowx = statsWithoutWeather[0] || {};
    
        const getPercentage = field => (((Number(data[field]) - Number(dataWowx[field])) / Number(dataWowx[field])) * 100).toFixed(1);
    
        // const whipAvgWowx = (Number(dataWowx.combined_pitching_bb) + Number(dataWowx.combined_batting_h)) /
        //   Number(dataWowx.combined_pitching_ip);
    
        // const whipAvg = (Number(data.combined_pitching_bb) + Number(data.combined_batting_h)) /
        //   Number(data.combined_pitching_ip);
    
        // const getWhipPercentage = () => {
        //   return (((whipAvg - whipAvgWowx) / whipAvgWowx) * 100).toFixed(2);
        // };
    
        const getDelta = (field, decimals) => (Number(data[field]) - Number(dataWowx[field])).toFixed(decimals);
    
        const getData = (field, label, decimals, icon) => ({
          wowxAvg: Number(dataWowx[field]).toFixed(decimals),
          avg: Number(data[field]).toFixed(decimals),
          delta: getDelta(field, decimals),
          label,
          percentage: getPercentage(field),
          icon
        });
    
        const home = teamLookup(game.home_team);
        const away = teamLookup(game.away_team);
        const wind = game.wind && game.wind.match(/(\D*)(\d*)/);
        const windDirection = wind && wind[1];
        const relativeWindDirection = getRelativeWindDirection(windDirection, data.orientation);

        results.push({
          id: game.id,
          count: data.count || 0,
          date: moment(game.date).format("HH:mm A"),
          home_short: game.home_team,
          home_location: home.location,
          home_mascot: home.mascot,
          away_short: game.away_team,
          away_location: away.location,
          away_mascot: away.mascot,
          home_short: game.home_team,
          away_short: game.away_team,
          stadium: game.stadium,
          dew_point: game.dew_point,
          temp: game.temp,
          windDirection: relativeWindDirection,
          windSpeed: wind && wind[2],
          precip: game.precip,
          roof: data.roof,
          stats: {
            rushing_yards: getData('total_rush_yds', 'Rushing Yards', 2),
            total_score: getData('combined_score', 'Average Score', 2),
            rushing_attempts: getData('total_rush_attempts', 'Rushing Attempts', 2),
            yards_per_carry: getData('total_yds_per_carry', 'Yards per Carry', 2),
            passing_yds_total: getData('passing_yds_total', 'Passing Yards', 2),
            passing_attempts_total: getData('passing_attempts_total', 'Passing Attempts', 2),
            passing_completion_total: getData('passing_completion_total', 'Passing Completions', 2),
            passing_comp_pct_total: getData('passing_comp_pct_total', 'Passing Completion Percentage', 2),
            turnovers_total: getData('turnovers_total', 'Total Turnovers', 2),
            passing_int_total: getData('passing_int_total', 'Interception', 2),
            fumbles_total: getData('fumbles_total', 'Fumbles', 2),
            total_points: getData('combined_score', 'Average Points', 2),
          },
        });
      });
    }
  });
  
  res.json(results.sort((a, b) => a.id - b.id ));
};