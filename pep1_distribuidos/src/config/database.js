
const Sequelize = require('sequelize');

module.exports =  new Sequelize('dist2_2020',
                                'test',
                                'abc123' 
                                , {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
//  operatorsAliases: false,
  operatorsAliases: '0',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});