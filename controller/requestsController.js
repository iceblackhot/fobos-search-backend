'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.requests = (req, res) => {
  db.query(
    "SELECT a.id, a.planDate, b.cityName, c.streetName, a.building, a.section, a.entrance, a.floor, a.apartment, a.mobile, a.addDate, a.lname, a.fname, a.patronymic, a.comment, IFNULL(d.statusName, '') AS statusName, IFNULL(e.workerName, '') AS workerName FROM requests AS a INNER JOIN cities AS b ON a.cityId = b.id LEFT JOIN streets AS c ON a.streetId = c.id LEFT JOIN statuses AS d ON a.status = d.id LEFT JOIN workers AS e ON a.workerId = e.id",
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        response.status(rows, res);
      }
    },
  );
};
