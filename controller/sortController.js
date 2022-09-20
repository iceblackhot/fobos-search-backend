'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.sortByAddDate = (req, res) => {
  console.log(req.body.sortParam);
  let sort = req.body.sortParam ? req.body.sortParam : '';
  let done = req.body.done ? req.body.done : 0;
  db.query(
    'SELECT * FROM `requests` WHERE 1 ORDER BY addDate AND taskDone = ' +
      done +
      sort +
      ' LIMIT 0,3',
    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        response.status(rows, res);
      }
    },
  );
};
