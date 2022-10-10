'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.connType = (req, res) => {
  db.query('SELECT * FROM `connection`', (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
