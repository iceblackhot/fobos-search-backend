'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.searchByDate = (req, res) => {
  let done = req.body.done ? req.body.done : 0;
  let type = 1;

  let from = req.body.from.split('T')[0];
  let to = req.body.to.split('T')[0];

  console.log(from);
  console.log(to);

  db.query(
    "SELECT a.id, a.cityId, a.streetId, a.workerId, a.statusId, a.planDate, b.cityName, c.streetName, a.building, a.section, a.entrance, a.floor, a.apartment, a.mobile, a.addDate, a.lname, a.fname, a.patronymic, a.comment, a.taskDone, a.type, a.priority, a.connTypeId, IFNULL(d.statusName, '') AS statusName, IFNULL(e.workerName, '') AS workerName FROM requests AS a LEFT JOIN cities AS b ON a.cityId = b.id LEFT JOIN streets AS c ON a.streetId = c.id LEFT JOIN statuses AS d ON a.statusId = d.id LEFT JOIN workers AS e ON a.workerId = e.id LEFT JOIN connection AS f ON a.connTypeId = f.id WHERE a.taskDone = " +
      done +
      ' AND a.type = ' +
      type +
      ' AND DATE(a.addDate) >= ? AND DATE(a.addDate) <= ?',
    [from, to],

    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        response.status(rows, res);
      }
    },
  );
};

// WHERE a.taskDone = " + done + ' AND a.addDate BETWEEN ? AND ?',[from, to]

// WHERE a.taskDone = " + done + ' AND  a.addDate >= ? AND a.addDate =< ?,[from, to]
