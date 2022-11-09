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

exports.newMonolith = (req, res) => {
  var WHERE = ['1'];
  var WHERE_CITY = undefined;
  var WHERE_STREET = undefined;
  var WHERE_STATUS = undefined;
  var WHERE_WORKER = undefined;
  // console.log(req.body.citySelectedList);
  if (req.body.citySelectedList && req.body.citySelectedList.length > 0) {
    WHERE_CITY = 'cities.id IN (' + req.body.citySelectedList.join() + ')';
    WHERE.push(WHERE_CITY);
  }
  if (req.body.streetSelectedList && req.body.streetSelectedList.length > 0) {
    WHERE_STREET = 'streets.id IN (' + req.body.streetSelectedList.join() + ')';
    WHERE.push(WHERE_STREET);
  }
  if (req.body.statusSelectedList && req.body.statusSelectedList.length) {
    WHERE_STATUS = 'statuses.id IN (' + req.body.statusSelectedList.join() + ')';
    WHERE.push(WHERE_STATUS);
  }
  if (req.body.workerSelectedList && req.body.workerSelectedList.length) {
    WHERE_WORKER = 'workers.id IN (' + req.body.workerSelectedList.join() + ')';
    WHERE.push(WHERE_WORKER);
  }
  if (req.body.searchText && req.body.searchText > 2) {
    WHERE.push(
      "(requests.fname LIKE '%" +
        req.body.searchText +
        "%' OR requests.lname LIKE '%" +
        req.body.searchText +
        "%' OR requests.patronymic LIKE '%" +
        req.body.searchText +
        "%' OR requests.comment LIKE '%" +
        req.body.searchText +
        "%' OR requests.mobile LIKE '%" +
        req.body.searchText +
        "%')",
    );
  }
  if (req.body.plannedDateFrom) {
    var date_start = new Date(req.body.plannedDateFrom);
    var date_end = req.body.plannedDateTo ? new Date(req.body.plannedDateTo) : new Date();
    WHERE.push(
      "requests.planDate BETWEEN '" +
        date_start.toISOString().slice(0, 10) +
        " 00:00:00' AND '" +
        date_end.toISOString().slice(0, 10) +
        " 23:59:59'",
    );
  }
  if (req.body.type) {
    WHERE.push('requests.type = ' + req.body.type);
  }
  if (req.body.taskDone) {
    WHERE.push('requests.taskDone = ' + req.body.taskDone);
  }

  res.status = 500;

  db.query(
    'SELECT requests.id, requests.cityId, cities.cityName, requests.streetId, streets.streetName, requests.statusId, statuses.statusName, requests.workerId, workers.workerName, requests.planDate, requests.building, requests.section, requests.entrance, requests.floor, requests.apartment, requests.mobile, requests.addDate, requests.lname, requests.fname, requests.patronymic, requests.comment, requests.taskDone, requests.type, requests.priority, requests.connTypeId FROM requests LEFT JOIN cities ON requests.cityId = cities.id LEFT JOIN streets ON requests.streetId = streets.id LEFT JOIN statuses ON requests.statusId = statuses.id LEFT JOIN workers ON requests.workerId = workers.id LEFT JOIN connection ON requests.connTypeId = connection.id WHERE ' +
      WHERE.join(' AND '),
    (error, rows, fields) => {
      if (error) {
        res.status = 500; // Internal Server Error
        res.json(error);
        res.end();
      } else {
        var taskList = rows;
        db.query(
          'SELECT cities.id, cities.cityName AS name FROM cities ORDER BY cityName ASC',
          (error, rows, fields) => {
            if (error) {
              res.status = 500;
              res.json(error);
            } else {
              var cityList = rows;
              db.query(
                "SELECT streets.id, streets.cityId, CONCAT(streets.streetName, ' (', cities.cityName, ')') AS name FROM streets INNER JOIN cities ON streets.cityId = cities.id" +
                  (WHERE_CITY ? ' WHERE (' + WHERE_CITY + ')' : ''),
                (error, rows, fields) => {
                  if (error) {
                    res.status = 500;
                    res.json(error);
                    res.end();
                  } else {
                    var streetList = rows;
                    db.query(
                      'SELECT statuses.id, statuses.statusName AS name FROM statuses',
                      (error, rows, fields) => {
                        if (error) {
                          res.status = 500;
                          res.json(error);
                          res.end();
                        } else {
                          var statusList = rows;
                          db.query(
                            'SELECT workers.id, workers.workerName AS name FROM workers',
                            (error, rows, fields) => {
                              if (error) {
                                res.status = 500;
                                res.json(error);
                                res.end();
                              } else {
                                var workerList = rows;
                                db.query(
                                  'SELECT COUNT(requests.id) AS taskTotal FROM requests LEFT JOIN cities ON requests.cityId = cities.id LEFT JOIN streets ON requests.streetId = streets.id LEFT JOIN statuses ON requests.statusId = statuses.id LEFT JOIN workers ON requests.workerId = workers.id LEFT JOIN connection ON requests.connTypeId = connection.id WHERE ' +
                                    WHERE.join(' AND '),
                                  (error, rows, fields) => {
                                    if (error) {
                                      res.status = 500;
                                      res.json(error);
                                    } else {
                                      res.status = 200;
                                      res.json({
                                        cityList: cityList,
                                        streetList: streetList,
                                        statusList: statusList,
                                        workerList: workerList,
                                        taskList: taskList,
                                        taskTotal: rows[0].taskTotal,
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
