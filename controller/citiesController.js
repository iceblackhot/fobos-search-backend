'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.cities = (req, res) => {
  db.query('SELECT * FROM `cities`', (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
