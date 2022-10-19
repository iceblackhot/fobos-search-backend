'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.requests = (req, res) => {
  let done = req.body.done ? req.body.done : 0;
  let id = req.params.id ? ' AND a.id = ' + Number(req.params.id) : '';
  let resultsPerPage = 3;
  let page = req.body.page ? Number(req.body.page) : 1;
  let startingLimit = (page - 1) * resultsPerPage;
  let endLimit = page * resultsPerPage;
  let type = req.body.type ? req.body.type : 1;
  // console.log(req.body.done);
  // const numOfResults = result.length;
  // console.log(id);
  // console.log(type);
  // console.log(req.body);

  db.query(
    "SELECT a.id, a.cityId, a.streetId, a.workerId, a.statusId, a.planDate, b.cityName, c.streetName, a.building, a.section, a.entrance, a.floor, a.apartment, a.mobile, a.addDate, a.lname, a.fname, a.patronymic, a.comment, a.taskDone, a.type, a.priority, a.connTypeId, a.type, IFNULL(d.statusName, '') AS statusName, IFNULL(e.workerName, '') AS workerName FROM requests AS a LEFT JOIN cities AS b ON a.cityId = b.id LEFT JOIN streets AS c ON a.streetId = c.id LEFT JOIN statuses AS d ON a.statusId = d.id LEFT JOIN workers AS e ON a.workerId = e.id LEFT JOIN connection AS f ON a.connTypeId = f.id WHERE `type` = " +
      type +
      ' AND a.taskDone = ' +
      done +
      id +
      ' ORDER BY addDate DESC LIMIT ' +
      `${startingLimit}` +
      ',' +
      `${resultsPerPage}`,

    (error, rows, fields) => {
      if (error) {
        response.status(400, error, res);
      } else {
        response.status(200, rows, res);
      }
    },
  );
};

exports.add = (req, res) => {
  if (req._body) {
    // console.log(req);
    // console.log(res);
    const sql =
      'INSERT INTO `requests`(`fname`, `lname`, `patronymic`, `planDate`, `addDate`, `comment`, `cityId`, `streetId`, `building`, `section`, `entrance`, `floor`, `apartment`, `mobile`, `workerId`, `statusId`, `type`, `priority`, `connTypeId`) VALUES(?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        req.body.fname,
        req.body.lname,
        req.body.patronymic,
        req.body.planDate,
        req.body.comment,
        req.body.cityId,
        req.body.streetId,
        req.body.building,
        req.body.section,
        req.body.entrance,
        req.body.floor,
        req.body.apartment,
        req.body.mobile,
        req.body.workerId,
        req.body.statusId,
        req.body.type,
        req.body.priority,
        req.body.connTypeId,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.json({status: 500, error: error});
        } else {
          res.json({status: 200, id: results.insertId});
        }
      },
    );
  }
};

exports.editApply = (req, res) => {
  if (req._body) {
    const sql =
      'UPDATE requests SET fname = ?, lname = ?, patronymic = ?, planDate = ?, comment = ?, cityId = ?, streetId = ?, building = ?, section = ?, entrance = ?, floor = ?, apartment = ?, mobile = ?, workerId = ?, statusId = ?, type = ?, priority = ?, connTypeId = ?' +
      (req.params.id ? ' WHERE id = ' + Number(req.params.id) : '');
    db.query(
      sql,
      [
        req.body.fname,
        req.body.lname,
        req.body.patronymic,
        req.body.planDate,
        req.body.comment,
        req.body.cityId,
        req.body.streetId,
        req.body.building,
        req.body.section,
        req.body.entrance,
        req.body.floor,
        req.body.apartment,
        req.body.mobile,
        req.body.workerId,
        req.body.statusId,
        req.body.type,
        req.body.priority,
        req.body.connTypeId,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.json({status: 500, error: error});
        } else {
          res.json({status: 200, id: req.params.id});
        }
      },
    );
  }
};
