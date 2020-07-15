const express = require('express');
const trainerRoute = express.Router();
const appControl = require('../controller/index').trainerController;

trainerRoute.route('/trainer').get(appControl.trainerInfo);
trainerRoute.route('/trainer').post(appControl.createTrainerInfo);
trainerRoute.route('/trainer/:id').get(appControl.showTrainerInfo);
trainerRoute.route('/trainer/:id').patch(appControl.updateTrainerInfo);
trainerRoute.route('/trainer/:id').delete(appControl.deleteTrainerInfo);

module.exports = trainerRoute;