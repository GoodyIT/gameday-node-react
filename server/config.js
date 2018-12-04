/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  host: process.env.HOST || 'localhost',
  port: 8089,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${8089}`,
  },

  // Database
  mysql: {
    database: 'rotogrindersnfl',
    username: process.env.NODE_ENV === 'development' ? 'root' : 'proxyuser',
    password: process.env.NODE_ENV === 'development' ? '' : '4batEGgF8aTU',
  },
};
