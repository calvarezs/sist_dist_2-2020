"use strict";

require('dotenv').config();

const nodemailer = require('nodemailer'); //Step 1


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
}); //Step 2

let mailOptions = {
  from: 'nreply.confrmat1on@gmail.com',
  to: 'vicente.brevis@usach.cl',
  subject: 'Testing and testing',
  text: 'It Works :)'
};
module.exports = transporter;
//# sourceMappingURL=server.js.map