'use strict';

const response = require('../response');
const db = require('./../settings/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res) => {
  db.query(
    "SELECT `id`, `login`, `email` FROM `users` WHERE `email` =  '" + req.body.email + "'",
    (error, rows, fields) => {
      // console.log(req.body.password);
      if (error) {
        response.status(400, error, res);
      } else if (typeof rows !== 'undefined' && rows.length > 0) {
        // console.log(rows);
        const row = JSON.parse(JSON.stringify(rows));
        row.map((rw) => {
          response.status(
            302,
            {message: `Пользователь с таким - ${rw.email} уже зарегистрирован`},
            res,
          );
          return true;
        });
      } else {
        const login = req.body.login;
        // const password = bcrypt.hashSync(req.body.password, 12);
        const password = req.body.password;
        const email = req.body.email;

        const sql =
          "INSERT INTO `users`(`login`, `password`, `email`) VALUES('" +
          login +
          "', '" +
          password +
          "', '" +
          email +
          "')";
        db.query(sql, (error, results) => {
          if (error) {
            response.status(400, error, res);
          } else {
            response.status(200, {message: `Регистрация прошла успешно!`, results}, res);
          }
        });
      }
    },
  );
};

exports.signin = (req, res) => {
  db.query(
    "SELECT `id`, `email`, `password`, `role` FROM `users` WHERE `email` = '" +
      req.body.email +
      "'",
    (error, rows, fields) => {
      // console.log(req.body.password);
      if (error) {
        response.status(400, error, res);
      } else if (rows.length <= 0) {
        response.status(
          401,
          {message: `Пользователь с - ${req.body.email} не найден, пройдите регистрацию!`},
          res,
        );
      } else {
        const row = JSON.parse(JSON.stringify(rows));
        row.map((rw) => {
          const password = req.body.password;
          const isValid = bcrypt.compareSync(rw.password, password);
          console.log(isValid);
          if (isValid) {
            const id = rw.id;
            const email = rw.email;
            const accessToken = jwt.sign(
              {userId: rw.id, email: rw.email, grouplist: rw.role},
              process.env.JWT,
              {
                expiresIn: 60 * 60 * 24,
              },
            );
            response.status(200, {id: id, email: email, token: accessToken}, res);
          } else {
            response.status(401, {message: `Пароль не верный!`}, res);
          }
          return true;
        });
      }
    },
  );
};

exports.logout = (req, res) => {
  jwt.verify('', null, null);
};
