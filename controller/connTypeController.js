'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.connType = (req, res) => {
  db.query('SELECT * FROM `connection`', (error, rows, fields) => {
    if (error) {
      response.status(400, error, res);
    } else {
      response.status(200, rows, res);
    }
  });
};
