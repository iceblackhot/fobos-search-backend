'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.users = (req, res) => {
  db.query('SELECT * FROM `cities`', (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};

//Add New city
exports.add = (req, res) => {
  const sql = "INSERT INTO `cities`(`cityName`) VALUES('" + req.query.cityName + "')";
  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.status(results, res);
    }
  });
};
