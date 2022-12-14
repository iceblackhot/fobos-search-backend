const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DBUSER,
  password: '',
  database: process.env.BDNAME,
});

connection.connect((error) => {
  if (error) {
    return console.log('Ошибка подключения к БД!');
  } else {
    return console.log('Подключено к БД!');
  }
});

module.exports = connection;
