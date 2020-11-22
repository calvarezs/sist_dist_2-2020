
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
    adress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_ext: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + (30 * interval \'1 minute\')'),
        allowNull: false
    }
},{timestamps: false});

module.exports = Permission;