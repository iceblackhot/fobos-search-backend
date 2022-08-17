'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.streets = (req, res) => {
  db.query('SELECT * FROM `streets`', (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
