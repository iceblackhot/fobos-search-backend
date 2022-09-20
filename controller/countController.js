'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.countDoneReq = (req, res) => {
  let done = 1;
  db.query('SELECT COUNT(id) FROM `requests` WHERE taskDone = ' + done, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};

exports.countRelevantReq = (req, res) => {
  let done = 0;
  db.query('SELECT COUNT(id) FROM `requests` WHERE taskDone = ' + done, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      response.status(rows, res);
    }
  });
};
