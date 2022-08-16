const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'search',
});

connection.connect((error) => {
  if (error) {
    return console.log('Ошибка подключения к БД!');
  } else {
    return console.log('Подключено к БД!');
  }
});

module.exports = connection;
