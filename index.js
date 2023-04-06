'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.FRONT_HOST);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const routes = require('./settings/routes');
routes(app);

app.listen(process.env.HOST_PORT, () => {
  console.log(`App listen on port ${process.env.HOST_PORT | process.env.HOST_SERVER}`);
});
