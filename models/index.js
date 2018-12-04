const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../server/config');

const db = {};
const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    operatorsAliases: false,
    // logging: false,
    pool: {
      max: 1000000,
      min: 0,
      idle: 20000,
      acquire: 20000
    }
  },
);

fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js',
  )
  .forEach(file => {
    const model = sequelize.import(path.resolve(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
