"use strict";

const express = require('express');

const path = require('path');

const routes = require("./routes/index");

const bodyParser = require('body-parser');

const cors = require('cors'); // DB


const db = require("./config/database"); // Test DB


db.authenticate().then(() => {
  console.log('Connection with DB has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // middlewares

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public')); // routes

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
module.exports = app;
//# sourceMappingURL=app.js.map