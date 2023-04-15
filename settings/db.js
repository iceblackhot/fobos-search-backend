'use strict';

const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.BDPASS,
  database: process.env.BDNAME,
});

connection.connect((error) => {
  console.log(error.code);
  if (error) {
    return console.log(error.message);
  } else {
    return console.log('Подключено к БД!');
  }
});

module.exports = connection;
