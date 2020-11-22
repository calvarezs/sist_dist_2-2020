
const Sequelize = require('sequelize');
const db = require ('../config/database');

const Permission = db.define('permission', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    motivo: {
        type: Sequelize.STRING
    },
    date_ext: {
        type: Sequelize.DATE,
        allowNull: false
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps: false});

module.exports = Permission;