const Promise = require('bluebird');
const models = require('../../models');
const moment = require('moment');

exports.getTableData = (req, res) => {
  const startTime = new Date();
  
  const {
    venue,
    barometricPressure,
    dewpoint,
    humidity,
    temp,
    windSpeed,
    windFieldDirection,
    startDate,
    endDate,
    precipitation,
  } = req.body;
  
  const tempAboveBelow = req.body.tempAboveBelow === 'above' ? '>=' : '<=';
  const windSpeedAboveBelow =
    req.body.windSpeedAboveBelow === 'above' ? '>=' : '<=';
  const barometricPressureAboveBelow =
    req.body.barometricPressureAboveBelow === 'above' ? '>=' : '<=';
  const dewpointAboveBelow =
    req.body.dewpointAboveBelow === 'above' ? '>=' : '<=';
  const humidityAboveBelow =
    req.body.humidityAboveBelow === 'above' ? '>=' : '<=';
  
  const query = (includeWeather) => {
    return models.sequelize.query(
      `SELECT
        AVG(game.combined_batting_h) combined_batting_h,
        AVG(game.combined_batting_rbi) combined_batting_rbi,
        AVG(game.combined_batting_avg) combined_batting_avg,
        AVG(game.combined_batting_slugging) combined_batting_slugging,
        AVG(game.combined_batting_ops) combined_batting_ops,
        AVG(game.combined_pa) combined_pa,
        AVG(game.combined_pitching_hr) combined_pitching_hr,
        AVG(game.combined_runs) combined_runs,
        
        AVG(game.combined_pitching_ip) combined_pitching_ip,
        AVG(game.combined_pitching_bb) combined_pitching_bb,
        AVG(game.combined_pitching_so) combined_pitching_so,
        AVG(game.combined_pitching_era) combined_pitching_era,
        AVG(game.combined_pitching_gb) combined_pitching_gb,
        AVG(game.combined_pitching_fb) combined_pitching_fb,
        AVG(game.combined_pitching_ld) combined_pitching_ld,
        
        AVG(game.combined_pitching_tp) combined_pitching_tp,
        AVG(game.combined_pitching_gb) combined_pitching_gb,
        AVG(game.combined_batting_obp) combined_batting_obp,
        AVG(game.combined_ab) combined_ab,
        AVG(game.combined_pitching_ld_percentage) combined_pitching_ld_percentage,
        AVG(game.combined_pitching_fb_percentage) combined_pitching_fb_percentage,
        AVG(game.combined_pitching_gb_percentage) combined_pitching_gb_percentage,
        
        AVG(game.home_score) avg_home_score, AVG(game.away_score) avg_score,
        venue.lat, venue.lng, COUNT(DISTINCT game.id) count, venue.name, venue.team

      FROM game JOIN venue ON game.venue_id = venue.id ${includeWeather ? 'JOIN weather ON game.id = weather.game_id' : ''}
      
      WHERE venue.name = :venue
      ${startDate ? `AND game.start_date >= '${startDate}'` : ''}
      ${endDate ? `AND game.end_date <= '${endDate}'` : ''}
      ${includeWeather ?
      ` ${windFieldDirection ? `AND weather.wind_field_direction = :windFieldDirection` : ''}
        ${precipitation === 'snow' ? `weather.snowfall > 0` : ''}
        ${precipitation === 'rain' ? `AND weather.precipitation > 0 AND weather.snowfall = 0` : ''}
        AND weather.temp ${tempAboveBelow} ${Number(temp)}
        AND weather.dew_point ${dewpointAboveBelow} ${Number(dewpoint)}
        AND weather.specific_humidity ${humidityAboveBelow} ${Number(humidity)}
        AND weather.wind_speed ${windSpeedAboveBelow} ${Number(windSpeed)}
        AND weather.pressure ${barometricPressureAboveBelow} ${Number(barometricPressure)}` : ''
      }
      
      GROUP BY ${includeWeather ? 'weather.game_id AND' : ''} venue.id, venue.lat, venue.lng, venue.name, venue.team
      ;`,
      {
        replacements: {
          venue,
          windFieldDirection,
          precipitation,
        },
        type: models.sequelize.QueryTypes.SELECT,
      },
    );
  };
  
  const statsWithWeather = query(true); // Include weather conditions
  const statsWithoutWeather = query(false); // Exclude weather conditions
  
  console.info('Fetching table data');
  Promise.all([
    statsWithWeather,
    statsWithoutWeather,
  ])
    .then(result => {
      const endTime = new Date();
      console.info('Received table data: ' + (endTime.getTime() - startTime.getTime()) / 1000 + ' s');
      const data = result[0] && result[0][0] || {};
      const dataWowx = result[1] && result[1][0] || {};
  
      const getPercentage = field => (((Number(data[field]) - Number(dataWowx[field])) / Number(dataWowx[field])) * 100).toFixed(2);
  
      const whipAvgWowx = (Number(dataWowx.combined_pitching_bb) + Number(dataWowx.combined_batting_h)) /
        Number(dataWowx.combined_pitching_ip);
  
      const whipAvg = (Number(data.combined_pitching_bb) + Number(data.combined_batting_h)) /
        Number(data.combined_pitching_ip);

      const getWhipPercentage = () => {
        return (((whipAvg - whipAvgWowx) / whipAvgWowx) * 100).toFixed(2);
      };
      
      const getDelta = (field, decimals) => (Number(data[field]) - Number(dataWowx[field])).toFixed(decimals);
      
      const getData = (field, label, decimals) => ({
        wowxAvg: Number(dataWowx[field]).toFixed(decimals),
        avg: Number(data[field]).toFixed(decimals),
        delta: getDelta(field, decimals),
        label,
        percentage: getPercentage(field),
      });
      
      res.json({
        lat: data.lat,
        lng: data.lng,
        team: data.team,
        stadium: data.name,
        count: data.count || 0,
        wowxCount: dataWowx.count || 0,
        batting: {
          h: getData('combined_batting_h', 'Hits', 2),
          rbi: getData('combined_batting_rbi', 'RBI', 2),
          avg: getData('combined_batting_avg', 'BA', 3),
          slg: getData('combined_batting_slugging', 'SLG', 3),
          ops: getData('combined_batting_ops', 'OPS', 3),
          pa: getData('combined_pa', 'PA', 2),
          hr: getData('combined_pitching_hr', 'HR', 2),
          tr: getData('combined_runs', 'Total Runs', 2)
        },
        pitching: {
          ip: getData('combined_pitching_ip', 'IP', 2),
          bb: getData('combined_pitching_bb', 'BB', 2),
          so: getData('combined_pitching_so', 'SO', 2),
          era: getData('combined_pitching_era', 'ERA', 2),
          gb: getData('combined_pitching_gb_percentage', 'Ground Ball %', 2),
          fb: getData('combined_pitching_fb_percentage', 'Fly Ball %', 2),
          ld: getData('combined_pitching_ld_percentage', 'Line Drive %', 2),
          whip: {
            wowxAvg: whipAvgWowx.toFixed(2),
            avg: whipAvg.toFixed(2),
            delta: (whipAvg - whipAvgWowx).toFixed(2),
            label: 'WHIP',
            percentage: getWhipPercentage(),
          },
        },
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};