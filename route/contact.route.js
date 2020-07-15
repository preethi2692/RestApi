const express = require('express');
const contactRoute = express.Router();
const appControl = require('../controller/index').contactController;

contactRoute.route('/contact').get(appControl.allContact);
contactRoute.route('/contact').post(appControl.createContact);
contactRoute.route('/contact/:id').get(appControl.showContact);
contactRoute.route('/contact/:id').patch(appControl.updateContact);
contactRoute.route('/contact/:id').delete(appControl.deleteContact);

module.exports = contactRoute;