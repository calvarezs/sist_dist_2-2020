
const Sequelize = require('sequelize');
const Permission = require('./Permission');
const db = require ('../config/database');

const Person = db.define('person', {
    firstname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    rut: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps: false});

Person.hasMany(Permission, {foreignKey: 'rut', sourceKey: 'rut'});
Permission.belongsTo(Person, {foreignKey: 'rut', sourceKey: 'rut'})

Person.sync() // Create the table if not exit in DB
module.exports = Person;