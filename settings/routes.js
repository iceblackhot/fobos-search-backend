'use strict';

module.exports = (app) => {
  const passport = require('passport');

  const usersController = require('../controller/usersController');
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

  app.route('/api/auth/signup').post(usersController.signup);
  app.route('/api/auth/signin').post(usersController.signin);

  app.route('/cities').get(passport.authenticate('jwt', {session: false}), citiesController.cities);

  app
    .route('/streets')
    .get(passport.authenticate('jwt', {session: false}), streetsController.streets);

  app
    .route('/statuses')
    .get(passport.authenticate('jwt', {session: false}), statusesController.statuses);

  app
    .route('/connType')
    .get(passport.authenticate('jwt', {session: false}), connTypeController.connType);

  app
    .route('/workers')
    .get(passport.authenticate('jwt', {session: false}), workersController.workers);

  app
    .route('/requests/:id')
    .post(passport.authenticate('jwt', {session: false}), requestsController.requests);

  app
    .route('/requests')
    .post(passport.authenticate('jwt', {session: false}), requestsController.requests);

  app
    .route('/requestsAdd')
    .post(passport.authenticate('jwt', {session: false}), requestsController.add);

  app
    .route('/requests/edit/save/:id')
    .post(passport.authenticate('jwt', {session: false}), requestsController.editApply);

  app
    .route('/requests/edit/save/taskDone/:id')
    .post(passport.authenticate('jwt', {session: false}), taskDoneController.taskDone);

  app
    .route('/requests/:done')
    .post(passport.authenticate('jwt', {session: false}), requestsController.requests);

  app
    .route('/countDoneReq')
    .get(passport.authenticate('jwt', {session: false}), countController.countDoneReq);

  app
    .route('/countRelevantReq')
    .get(passport.authenticate('jwt', {session: false}), countController.countRelevantReq);

  app
    .route('/countDoneFaq')
    .get(passport.authenticate('jwt', {session: false}), countController.countDoneFaq);

  app
    .route('/countRelevantFaq')
    .get(passport.authenticate('jwt', {session: false}), countController.countRelevantFaq);

  app
    .route('/sortByAddDate/:done')
    .post(passport.authenticate('jwt', {session: false}), sortController.sortByAddDate);

  app
    .route('/searchTask/:query')
    .post(passport.authenticate('jwt', {session: false}), searchController.searchTask);

  app
    .route('/rangeByAddDate')
    .post(passport.authenticate('jwt', {session: false}), rangeDateController.searchByDate);

  app.route('/faq').get(passport.authenticate('jwt', {session: false}), faqController.faq);

  app.route('/doneFaq').get(passport.authenticate('jwt', {session: false}), faqController.doneFaq);

  app.route('/lan').get(passport.authenticate('jwt', {session: false}), connFilterController.lan);

  app.route('/pon').get(passport.authenticate('jwt', {session: false}), connFilterController.pon);
};
