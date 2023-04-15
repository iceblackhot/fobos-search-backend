'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'UPDATE', 'OPTIONS'],
  }),
);

console.log(process.env);

const routes = require('./settings/routes');
routes(app);

app.listen(process.env.HOST_PORT, () => {
  console.log(`App listen on port ${process.env.HOST_PORT}`);
});
