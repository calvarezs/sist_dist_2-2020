"use strict";

const Sequelize = require('sequelize');

module.exports = new Sequelize('pep2', 'test', 'abc123', {
  host: 'db',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
//# sourceMappingURL=database.js.map