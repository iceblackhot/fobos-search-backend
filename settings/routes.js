'use strict';

module.exports = (app) => {
  const indexController = require('./../controller/indexController');
  const citiesController = require('./../controller/citiesController');

  app.route('/').get(indexController.index);
  app.route('/cities').get(citiesController.users);
  app.route('/cities/add').post(citiesController.add);
};
