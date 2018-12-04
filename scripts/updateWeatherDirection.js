const Promise = require('bluebird');
const models = require('../models');
const { convertWindDirection } = require('../utils');

const { Weather } = models;

export default () => {
  models.sequelize.query(`
    SELECT game.id as game_id, mlb.wind_direction as wind_direction, venue.orientationDeg as orientation_deg
      FROM mlb
        JOIN venue ON game.venue_id = venue.id
    ;
    `,
    {
      type: models.sequelize.QueryTypes.SELECT,
    },
  ).then(result => {
    return Promise.map(
      result,
      item => {
        return Weather.update(
          {
            wind_field_direction: convertWindDirection(
              item.wind_direction,
              item.orientation_deg,
            ),
          },
          {
            where: { game_id: item.game_id },
          },
        )
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log('ERROR', err);
          });
        
      },
      { concurrency: 20 },
    );
  }).catch(err => {
    console.log(err)
  });
}
