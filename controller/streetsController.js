'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.streets = (req, res) => {
  db.query('SELECT * FROM `streets`', (error, rows, fields) => {
    if (error) {
      response.status(400, error, res);
    } else {
      response.status(200, rows, res);
    }
  });
};
