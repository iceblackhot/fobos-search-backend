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

  db.query(
    'SELECT * FROM `requests` WHERE `lname` LIKE ? OR `fname` LIKE ? OR `patronymic` LIKE ? OR `mobile` LIKE ? OR `building` LIKE ?',
    ['%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%'],
    (error, rows) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};
