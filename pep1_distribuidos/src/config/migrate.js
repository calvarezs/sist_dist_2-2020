//migrate.js

//var db = require('./database');
var Person = require('../models/Person');
var Permission = require('../models/Permission');

//db.sequelize.sync();
Person.sequelize.sync();
Permission.sequelize.sync();