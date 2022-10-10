'use strict';

module.exports = (app) => {
  const indexController = require('./../controller/indexController');
  const citiesController = require('./../controller/citiesController');
  const streetsController = require('./../controller/streetsController');
  const statusesController = require('./../controller/statusesController');
  const connTypeController = require('./../controller/connTypeController');
  const workersController = require('./../controller/workersController');
  const requestsController = require('./../controller/requestsController');
  const taskDoneController = require('./../controller/taskDoneController');
  const countController = require('./../controller/countController');
  const sortController = require('./../controller/sortController');
  const searchController = require('./../controller/searchController');
  const rangeDateController = require('./../controller/rangeDateController');
  const faqController = require('./../controller/faqController');
  const connFilterController = require('./../controller/connFilterController');

  app.route('/').get(indexController.index);

  app.route('/cities').get(citiesController.cities);

  app.route('/streets').get(streetsController.streets);

  app.route('/statuses').get(statusesController.statuses);

  app.route('/connType').get(connTypeController.connType);

  app.route('/workers').get(workersController.workers);

  app.route('/requests/:id/').post(requestsController.requests);
  app.route('/requests').post(requestsController.requests);
  app.route('/requests/add').post(requestsController.add);
  app.route('/requests/edit/save/:id').post(requestsController.editApply);

  app.route('/requests/edit/save/taskDone/:id').post(taskDoneController.taskDone);

  app.route('/requests/:done').post(requestsController.requests);

  app.route('/countDoneReq').get(countController.countDoneReq);
  app.route('/countRelevantReq').get(countController.countRelevantReq);
  app.route('/countDoneFaq').get(countController.countDoneFaq);
  app.route('/countRelevantFaq').get(countController.countRelevantFaq);

  app.route('/sortByAddDate/:done').post(sortController.sortByAddDate);

  app.route('/searchTask/:query').post(searchController.searchTask);

  app.route('/rangeByAddDate').post(rangeDateController.searchByDate);

  app.route('/faq').get(faqController.faq);
  app.route('/doneFaq').get(faqController.doneFaq);

  app.route('/lan').get(connFilterController.lan);
  app.route('/pon').get(connFilterController.pon);
};
