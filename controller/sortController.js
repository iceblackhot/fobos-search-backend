'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.sortByAddDate = (req, res) => {
  let sort = req.body.sortParam ? req.body.sortParam : '';
  let done = req.body.done ? req.body.done : 0;
  // console.log(res);
  // console.log(done);
  // console.log(req.body.sortParam);
  db.query(
    'SELECT * FROM `requests` WHERE `taskDone` = ' +
      done +
      ' ORDER BY `addDate`' +
      sort +
      ' LIMIT 0,3',
    (error, rows) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};
