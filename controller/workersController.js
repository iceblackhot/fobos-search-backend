'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.workers = (req, res) => {
  db.query('SELECT * FROM `workers`', (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
