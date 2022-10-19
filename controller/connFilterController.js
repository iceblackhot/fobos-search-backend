'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.pon = (req, res) => {
  //   let type = req.body.type ? req.body.type : 2;
  //   let done = req.body.done ? req.body.done : 0;

  let connTypeId = 2;
  let done = 0;

  db.query(
    "SELECT a.id, a.cityId, a.streetId, a.workerId, a.statusId, a.planDate, b.cityName, c.streetName, a.building, a.section, a.entrance, a.floor, a.apartment, a.mobile, a.addDate, a.lname, a.fname, a.patronymic, a.comment, a.taskDone, a.type, a.priority, a.connTypeId, IFNULL(d.statusName, '') AS statusName, IFNULL(e.workerName, '') AS workerName FROM requests AS a LEFT JOIN cities AS b ON a.cityId = b.id LEFT JOIN streets AS c ON a.streetId = c.id LEFT JOIN statuses AS d ON a.statusId = d.id LEFT JOIN workers AS e ON a.workerId = e.id LEFT JOIN connection AS f ON a.connTypeId = f.id WHERE a.connTypeId = " +
      connTypeId +
      ' AND `taskDone` = ' +
      done,
    (error, rows, fields) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};

exports.lan = (req, res) => {
  //   let type = req.body.type ? req.body.type : 2;
  //   let done = req.body.done ? req.body.done : 0;

  let connTypeId = 1;
  let done = 0;

  db.query(
    "SELECT a.id, a.cityId, a.streetId, a.workerId, a.statusId, a.planDate, b.cityName, c.streetName, a.building, a.section, a.entrance, a.floor, a.apartment, a.mobile, a.addDate, a.lname, a.fname, a.patronymic, a.comment, a.taskDone, a.type, a.priority, a.connTypeId, IFNULL(d.statusName, '') AS statusName, IFNULL(e.workerName, '') AS workerName FROM requests AS a LEFT JOIN cities AS b ON a.cityId = b.id LEFT JOIN streets AS c ON a.streetId = c.id LEFT JOIN statuses AS d ON a.statusId = d.id LEFT JOIN workers AS e ON a.workerId = e.id LEFT JOIN connection AS f ON a.connTypeId = f.id WHERE a.connTypeId = " +
      connTypeId +
      ' AND `taskDone` = ' +
      done,
    (error, rows, fields) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};
