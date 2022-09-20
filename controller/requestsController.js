'use strict';

const response = require('../response');
const db = require('../settings/db');

exports.requests = (req, res) => {
  let done = req.body.done ? req.body.done : 0;
  console.log(req.body);
  let resultsPerPage = 3;
  let page = req.body.page ? Number(req.body.page) : 1;
  let startingLimit = (page - 1) * resultsPerPage;

  db.query(
    "SELECT a.id, a.cityId, a.streetId, a.workerId, a.statusId, a.planDate, b.cityName, c.streetName, a.building, a.section, a.entrance, a.floor, a.apartment, a.mobile, a.addDate, a.lname, a.fname, a.patronymic, a.comment, a.taskDone, a.type, a.priority, IFNULL(d.statusName, '') AS statusName, IFNULL(e.workerName, '') AS workerName FROM requests AS a LEFT JOIN cities AS b ON a.cityId = b.id LEFT JOIN streets AS c ON a.streetId = c.id LEFT JOIN statuses AS d ON a.statusId = d.id LEFT JOIN workers AS e ON a.workerId = e.id WHERE a.taskDone = " +
      done +
      (req.params.id ? ' AND a.id = ' + Number(req.params.id) : '') +
      ' LIMIT ' +
      `${startingLimit}` +
      ',' +
      `${resultsPerPage}`,
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        response.status(rows, res);
      }
    },
  );
};

///////////////////////////////////////////////////// const resultsPerPage = 30;
// app.get('/', (req, res) => {
//   let sql = 'SELECT * FROM photos';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     const numOfResults = result.length;
//     const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
//     let page = req.query.page ? Number(req.query.page) : 1;
//     if (page > numberOfPages) {
//       res.redirect('/?page=' + encodeURIComponent(numberOfPages));
//     } else if (page < 1) {
//       res.redirect('/?page=' + encodeURIComponent('1'));
//     }
//     //Determine the SQL LIMIT starting number
//     const startingLimit = (page - 1) * resultsPerPage;
//     //Get the relevant number of POSTS for this starting page
//     sql = `SELECT * FROM photos LIMIT ${startingLimit},${resultsPerPage}`;
//     db.query(sql, (err, result) => {
//       if (err) throw err;
//       let iterator = page - 5 < 1 ? 1 : page - 5;
//       let endingLink = iterator + 9 <= numberOfPages ? iterator + 9 : page + (numberOfPages - page);
//       if (endingLink < page + 4) {
//         iterator -= page + 4 - numberOfPages;
//       }
//       res.render('index', {data: result, page, iterator, endingLink, numberOfPages});
//     });
//   });
// });
//////////////////////////////////////////////////

exports.add = (req, res) => {
  if (req._body) {
    console.log(req.body);
    const sql =
      'INSERT INTO `requests`(`fname`, `lname`, `patronymic`, `planDate`, `addDate`, `comment`, `cityId`, `streetId`, `building`, `section`, `entrance`, `floor`, `apartment`, `mobile`, `workerId`, `statusId`, `type`, `priority`) VALUES(?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
    console.log(req.body);
    const sql =
      'UPDATE requests SET fname = ?, lname = ?, patronymic = ?, planDate = ?, comment = ?, cityId = ?, streetId = ?, building = ?, section = ?, entrance = ?, floor = ?, apartment = ?, mobile = ?, workerId = ?, statusId = ?, type = ?, priority = ?' +
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
