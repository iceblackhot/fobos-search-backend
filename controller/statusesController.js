'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.statuses = (req, res) => {
  db.query('SELECT * FROM `statuses`', (error, rows, fields) => {
    if (error) {
      response.status(400, error, res);
    } else {
      response.status(200, rows, res);
    }
  });
};
