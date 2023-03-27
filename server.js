'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const routes = require('./settings/routes');
routes(app);

app.listen(process.env.PORT, () => {
  console.log(`App listen on port ${process.env.PORT | process.env.HOST}`);
});
