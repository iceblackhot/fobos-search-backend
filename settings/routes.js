'use strict';

module.exports = (app) => {
  const indexController = require('./../controller/indexController');
  const citiesController = require('./../controller/citiesController');
  const streetsController = require('./../controller/streetsController');
  const statusesController = require('./../controller/statusesController');
  const workersController = require('./../controller/workersController');

  app.route('/').get(indexController.index);

  app.route('/cities').get(citiesController.cities);
  app.route('/cities/add').post(citiesController.add);

  app.route('/streets').get(streetsController.streets);

  app.route('/statuses').get(statusesController.statuses);

  app.route('/workers').get(workersController.workers);
};
