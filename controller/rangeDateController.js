'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.searchByDate = (req, res) => {
  // new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

  let date = new Date();

  let from = req.body.from.replace(/T/, ' ').replace(/\..+/, '');
  let to = req.body.to.replace(/T/, ' ').replace(/\..+/, '');

  from ? from : date;
  to ? to : date;

  console.log(from + ' from date');
  console.log(to + ' to date');

  db.query('SELECT * FROM `requests` WHERE addDate BETWEEN ? AND ?', [from, to], (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
