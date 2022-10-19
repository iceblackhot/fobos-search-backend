'use strict';

const response = require('../response');
const db = require('./../settings/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllUsers = (req, res) => {
  db.query('SELECT `id`, `login`, `email` FROM `users`', (error, rows, fields) => {
    if (error) {
      response.status(400, error, res);
    } else {
      response.status(200, rows, res);
    }
  });
};

exports.signup = (req, res) => {
  db.query(
    "SELECT `id`, `login`, `email` FROM `users` WHERE `email` =  '" + req.body.email + "'",
    (error, rows, fields) => {
      console.log(req.body);
      if (error) {
        response.status(400, error, res);
      } else if (typeof rows !== 'undefined' && rows.length > 0) {
        console.log(rows);
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
        //Need check login & email & pass !== ''
        const login = req.body.login;
        const salt = bcrypt.genSaltSync(15);
        const password = bcrypt.hashSync(req.body.password, salt);
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
    "SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" + req.body.email + "'",
    (error, rows, fields) => {
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
          const password = bcrypt.compareSync(req.body.password, rw.password);
          if (password) {
            const token = jwt.sign({userId: rw.id, email: rw.email}, process.env.JWT, {
              expiresIn: 120 * 120,
            });
            response.status(200, {token: `Bearer ${token}`}, res);
          } else {
            response.status(401, {message: `Пароль не верный!`}, res);
          }
          return true;
        });
      }
    },
  );
};
