const express = require('express');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();

const apiRoutes = require('./api');
const models = require('../models');

app.prepare().then(() => {
  const server = express();
  
  server.use(bodyParser.json());
  
  server.use('/api/v1', apiRoutes);
  
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  
  /* eslint-disable no-console */
  models.sequelize.sync().then(() => {
    server.listen(8089, (err) => {
      if (err) throw err;
      console.log('Server ready on http://localhost:8089');
    });
  });
});