'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.searchTask = (req, res) => {
  let done = req.body.done ? req.body.done : 0;
  //   console.log(res);
  //   console.log(req.query);
  // console.log(done);
  //   console.log(req.params.query);

  let value = req.params.query ? req.params.query : '';

  db.query('SELECT * FROM `requests` WHERE lname LIKE ?', ['%' + value + '%'], (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
