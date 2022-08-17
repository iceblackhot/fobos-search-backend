'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.statuses = (req, res) => {
  db.query('SELECT * FROM `statuses`', (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
