'use strict';

module.exports = (app) => {
  const usersController = require('../controller/usersController');
  const requestsController = require('./../controller/requestsController');

  app.route('/api/auth').post(usersController.signin);
  app.route('/api/logout').post(usersController.logout);
  app.route('/api/list').post(requestsController.newMonolith);
  app.route('/api/save').post(requestsController.newMonolithSave);
  app.route('/api/history').post(requestsController.newMonolithHistory);
};
