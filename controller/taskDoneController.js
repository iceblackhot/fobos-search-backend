'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.taskDone = (req, res) => {
  if (req._body) {
    console.log(req.body);
    const sql =
      'UPDATE `requests` SET `taskDone` = ?' +
      (req.params.id ? ' WHERE id = ' + Number(req.params.id) : '');
    db.query(sql, [req.body.taskDone], (error, results, fields) => {
      if (error) {
        console.log(error);
        res.json({status: 500, error: error});
      } else {
        res.json({status: 200, id: req.params.id});
      }
    });
  }
};
