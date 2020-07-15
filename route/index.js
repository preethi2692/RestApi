const express = require('express');
const mainRoute = express.Router();
const app = express();
const contactRoute = require('./contact.route');
const courseRoute = require('./course.route');
const studentRoute = require('./student.route');
const trainerRoute = require('./trainer.route');

mainRoute.route('/contact', app.use(contactRoute));
mainRoute.route('/course', app.use(courseRoute));
mainRoute.route('/student',app.use(studentRoute));
mainRoute.route('/trainer', app.use(trainerRoute));

module.exports = mainRoute;