'use strict';

const response = require('../response');
const db = require('../settings/db');
const jwt = require('jsonwebtoken');
var util = require('util');
const {Console} = require('console');

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

exports.newMonolith = (req, res) => {
  let token = req.get('Authorization');
  if (token == null) {
    res.statusCode = 401;
    res.send();
    return;
  }

  let payload = null;

  try {
    payload = jwt.verify(token, process.env.JWT);
  } catch (ex) {
    res.statusCode = 401;
    res.send();
    return res;
  }

  let cities = payload.grouplist.split(';');

  var WHERE = ['1'];
  var WHERE_CITY = undefined;
  var WHERE_STREET = undefined;
  var WHERE_STATUS = undefined;
  var WHERE_WORKER = undefined;
  // console.log(req.body.citySelectedList);
  if (req.body.citySelectedList && req.body.citySelectedList.length > 0) {
    WHERE_CITY =
      'cities.id IN (' +
      req.body.citySelectedList
        .filter((value) => {
          return cities.includes(value);
        })
        .join() +
      ')';
    WHERE.push(WHERE_CITY);
  } else {
    WHERE_CITY = 'cities.id IN (' + cities.join() + ')';
    WHERE.push(WHERE_CITY);
  }
  if (req.body.streetSelectedList && req.body.streetSelectedList.length > 0) {
    WHERE_STREET = 'streets.id IN (' + db.escape(req.body.streetSelectedList.join()) + ')';
    WHERE.push(WHERE_STREET);
  }
  if (req.body.statusSelectedList && req.body.statusSelectedList.length > 0) {
    WHERE_STATUS = 'statuses.id IN (' + db.escape(req.body.statusSelectedList.join()) + ')';
    WHERE.push(WHERE_STATUS);
  }
  if (req.body.workerSelectedList && req.body.workerSelectedList.length > 0) {
    WHERE_WORKER = 'workers.id IN (' + db.escape(req.body.workerSelectedList.join()) + ')';
    WHERE.push(WHERE_WORKER);
  }
  if (req.body.searchText && req.body.searchText.length > 2) {
    // console.log(req.body.searchText);
    var text = db.escape('%' + req.body.searchText + '%');
    WHERE.push(
      '(requests.fname LIKE ' +
        text +
        ' OR requests.lname LIKE ' +
        text +
        ' OR requests.patronymic LIKE ' +
        text +
        ' OR requests.comment LIKE ' +
        text +
        ' OR requests.mobile LIKE ' +
        text +
        ')',
    );
  }
  if (req.body.plannedDateFrom) {
    //var date_start = req.body.plannedDateFrom ? req.body.plannedDateFrom.split('T')[0] : '';
    var date_start = new Date(req.body.plannedDateFrom);
    //var date_end = req.body.plannedDateTo ? req.body.plannedDateTo.split('T')[0] : '';
    var date_end = new Date(req.body.plannedDateTo);

    WHERE.push(
      "requests.planDate BETWEEN '" +
        date_start.getFullYear() +
        '-' +
        String(date_start.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date_start.getDate()).padStart(2, '0') +
        " 00:00:00' AND '" +
        date_end.getFullYear() +
        '-' +
        String(date_end.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date_end.getDate()).padStart(2, '0') +
        " 23:59:59'",
    );
    // console.log(
    //   date_start.getFullYear() +
    //     '-' +
    //     String(date_start.getMonth() + 1).padStart(2, '0') +
    //     '-' +
    //     String(date_start.getDate()).padStart(2, '0') +
    //     ' ' +
    //     date_end.toString(),
    // );
  }
  if (typeof req.body.type !== 'undefined') {
    // console.log('taskType - ' + req.body.type);
    WHERE.push('requests.type = ' + db.escape(req.body.type));
  }
  if (typeof req.body.taskDone !== 'undefined') {
    // console.log('taskDone - ' + req.body.taskDone);
    WHERE.push('requests.taskDone = ' + db.escape(req.body.taskDone));
  }
  if (typeof req.body.connTypeId !== 'undefined') {
    // console.log('taskDone - ' + req.body.taskDone);
    if (req.body.connTypeId > 0) {
      WHERE.push('requests.connTypeId = ' + db.escape(req.body.connTypeId));
    }
  }

  var limitStart = 0;
  var limitStop = 10;

  limitStart = req.body.currentPage * req.body.pageRows;
  limitStop = req.body.pageRows;

  // console.log(' LIMIT ' + limitStart + ',' + limitStop);

  res.status = 500;

  db.query(
    "SELECT requests.id, requests.cityId, cities.cityName, requests.streetId, streets.streetName, requests.statusId, statuses.statusName, requests.workerId, workers.workerName, IFNULL(requests.planDate, '') AS planDate, requests.building, requests.section, requests.entrance, requests.floor, requests.apartment, requests.mobile, requests.addDate, requests.lname, requests.fname, requests.patronymic, requests.comment, requests.taskDone, requests.type, requests.priority, requests.connTypeId FROM requests LEFT JOIN cities ON requests.cityId = cities.id LEFT JOIN streets ON requests.streetId = streets.id LEFT JOIN statuses ON requests.statusId = statuses.id LEFT JOIN workers ON requests.workerId = workers.id LEFT JOIN connection ON requests.connTypeId = connection.id WHERE " +
      WHERE.join(' AND ') +
      ' LIMIT ' +
      limitStart +
      ',' +
      limitStop,
    (error, rows, fields) => {
      if (error) {
        res.status = 500; // Internal Server Error
        res.json(error);
        res.end();
      } else {
        var taskList = rows;
        db.query(
          'SELECT cities.id, cities.id as value, cities.cityName AS name, cities.cityName AS label FROM cities WHERE ' +
            WHERE_CITY +
            ' ORDER BY cityName ASC',
          (error, rows, fields) => {
            if (error) {
              res.status = 500;
              res.json(error);
            } else {
              var cityList = rows;
              db.query(
                "SELECT streets.id, streets.id AS value, streets.cityId, CONCAT(streets.streetName, ' (', cities.cityName, ')') AS name, streets.cityId, CONCAT(streets.streetName, ' (', cities.cityName, ')') AS label FROM streets INNER JOIN cities ON streets.cityId = cities.id WHERE " +
                  WHERE_CITY,
                (error, rows, fields) => {
                  if (error) {
                    res.status = 500;
                    res.json(error);
                    res.end();
                  } else {
                    var streetList = rows;
                    db.query(
                      'SELECT statuses.id, statuses.id AS value, statuses.statusName AS name, statuses.statusName AS label FROM statuses',
                      (error, rows, fields) => {
                        if (error) {
                          res.status = 500;
                          res.json(error);
                          res.end();
                        } else {
                          var statusList = rows;
                          db.query(
                            'SELECT workers.id, workers.id AS value, workers.workerName AS name, workers.workerName AS label FROM workers',
                            (error, rows, fields) => {
                              if (error) {
                                res.status = 500;
                                res.json(error);
                                res.end();
                              } else {
                                var workerList = rows;

                                // console.log(WHERE.join(' AND '));
                                db.query(
                                  'SELECT COUNT(requests.id) AS taskTotal FROM requests LEFT JOIN cities ON requests.cityId = cities.id LEFT JOIN streets ON requests.streetId = streets.id LEFT JOIN statuses ON requests.statusId = statuses.id LEFT JOIN workers ON requests.workerId = workers.id LEFT JOIN connection ON requests.connTypeId = connection.id WHERE ' +
                                    WHERE.join(' AND '),
                                  (error, rows, fields) => {
                                    if (error) {
                                      res.status = 500;
                                      res.json(error);
                                    } else {
                                      res.status = 200;
                                      let new_token = null;
                                      if (
                                        payload.exp - Math.floor(Date.now() / 1000) <=
                                        Math.floor(process.env.JWT_EXPIRE_TIME / 2)
                                      )
                                        new_token = jwt.sign(
                                          {
                                            userId: payload.id,
                                            email: payload.email,
                                            grouplist: payload.grouplist,
                                          },
                                          process.env.JWT,
                                          {
                                            expiresIn: 60 * 60 * 24,
                                          },
                                        );
                                      res.json({
                                        cityList: cityList,
                                        streetList: streetList,
                                        statusList: statusList,
                                        workerList: workerList,
                                        taskList: taskList,
                                        taskTotal: rows[0].taskTotal,
                                        token: new_token,
                                      });
                                    }
                                  },
                                );
                              }
                            },
                          );
                        }
                      },
                    );
                  }
                },
              );
            }
          },
        );
      }
    },
  );
};

exports.newMonolithSave = (req, res) => {
  let token = req.get('Authorization');
  if (token == null) {
    res.statusCode = 401;
    res.send();
    return;
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT);
  } catch (ex) {
    res.statusCode = 401;
    res.send();
    return res;
  }

  if (typeof req.body.task.id != 'undefined') {
    let sql = '';

    if (req.body.task.id > 0) {
      sql =
        'UPDATE requests SET cityId = ?, streetId = ?, fname = ?, lname = ?, patronymic = ?, statusId = ?, workerId = ?, planDate = ?, chgDate = NOW(), comment = ?, building = ?, section = ?, entrance = ?, floor = ?, apartment = ?, mobile = ?, taskDone = ?, type = ?, priority = ?, connTypeId = ? WHERE id = ?';
    } else {
      sql =
        'INSERT INTO requests (cityId, streetId, fname, lname, patronymic, statusId, workerId, planDate, addDate, chgDate, comment, building, section, entrance, floor, apartment, mobile, taskDone, type, priority, connTypeId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    }
    console.log(sql);
    db.query(
      sql,
      [
        req.body.task.cityId,
        req.body.task.streetId,
        req.body.task.fname,
        req.body.task.lname,
        req.body.task.patronymic,
        req.body.task.statusId,
        req.body.task.workerId,
        req.body.task.planDate == '0000-00-00 00:00:00' ? null : req.body.task.planDate,
        req.body.task.comment,
        req.body.task.building,
        req.body.task.section,
        req.body.task.entrance,
        req.body.task.floor,
        req.body.task.apartment,
        req.body.task.mobile,
        req.body.task.taskDone,
        req.body.task.type,
        req.body.task.priority,
        req.body.task.connTypeId,
        req.body.task.id,
      ],
      (error, rows, fields) => {
        if (error) {
          throw error;
        } else {
          res.status = 200;
          res.json({
            result: 0,
          });
        }
      },
    );
  }
};
