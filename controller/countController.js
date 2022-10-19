'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.countDoneReq = (req, res) => {
  let done = 1;
  let type = 1;
  db.query(
    'SELECT COUNT(id) FROM `requests` WHERE `type` = ' + type + ' AND  taskDone = ' + done,
    (error, rows) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};

exports.countRelevantReq = (req, res) => {
  let done = 0;
  let type = 1;
  db.query(
    'SELECT COUNT(id) FROM `requests` WHERE `type` = ' + type + ' AND taskDone = ' + done,
    (error, rows) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};

exports.countRelevantFaq = (req, res) => {
  let done = 0;
  let type = 2;
  db.query(
    'SELECT COUNT(id) FROM `requests` WHERE `type` = ' + type + ' AND taskDone = ' + done,
    (error, rows) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};

exports.countDoneFaq = (req, res) => {
  let done = 1;
  let type = 2;
  db.query(
    'SELECT COUNT(id) FROM `requests` WHERE `type` = ' + type + ' AND taskDone = ' + done,
    (error, rows) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};
