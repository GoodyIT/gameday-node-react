const fs = require('fs');
const axios = require('axios');
const CronJob = require('cron').CronJob;
const models = require('../models');

async function importCSV () {

  const url = 'https://rotogrinders.com/weather/mlb.csv';
  const csvPath = '/tmp/mlb.csv';
  console.log('Downloading CSV file for import');
  // axios image download with response type "stream"
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  });

  try {
    // pipe the result stream into a file on disc
    response.data.pipe(fs.createWriteStream(csvPath));
  } catch (err) {
    console.log('Error writing CSV', err);
  }

  response.data.on('end', async () => {
    console.log('Starting CSV import');
    
    try {
      await models.sequelize.query('TRUNCATE TABLE mlb;')
    } catch (err) {
      console.log(err);
    }
    
    try {
      await models.sequelize.query(`
        LOAD DATA LOCAL INFILE '/tmp/mlb.csv'
        REPLACE INTO TABLE mlb
        FIELDS ENCLOSED BY '"' TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS
        (@a, @date, @b, @c, @d, @e, @f, @g, @h, @i, @j, @k, @l, @m, @n, @o)
        SET
           away_id = IF(@b = '', NULL, @b),
           away_team = IF(@c = '', NULL, @c),
           away_vegas = IF(@d = '', NULL, @d),
           away_moneyline = IF(@e = '', NULL, @e),
           home_id = IF(@f = '', NULL, @f),
           home_team = IF(@g = '', NULL, @g),
           home_vegas = IF(@h = '', NULL, @h),
           home_moneyline = IF(@i = '', NULL, @i),
           stadium = IF(@j = '', NULL, @j),
           temp = IF(@k = '', NULL, @k),
           precip = IF(@l = '', NULL, @l),
           humidity = IF(@m = '', NULL, @m),
           dew_point = IF(@n = '', NULL, @n),
           wind = IF(@o = '', NULL, @o)
           ;
       `
      );
    } catch (err) {
      console.log(err);
    }
  });

  response.data.on('error', err => {
    console.log(err);
  });
}

importCSV();

new CronJob('*/10 * * * *', () => {
  importCSV();
}, null, true, 'America/Los_Angeles');
