const express = require('express');
const courseRoute = express.Router();
const appControl = require('../controller/index').courseController;

courseRoute.route('/course').get(appControl.courseInfo);
courseRoute.route('/course').post(appControl.createCourse);
courseRoute.route('/course/:id').get(appControl.showCourse);
courseRoute.route('/course/:id').patch(appControl.updateCourse);
courseRoute.route('/course/:id').delete(appControl.deleteCourse);

module.exports = courseRoute;