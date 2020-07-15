const express = require('express');
const studentRoute = express.Router();
const appControl = require('../controller/index').studentController;

studentRoute.route('/student').get(appControl.studentInfo);
studentRoute.route('/student').post(appControl.createStudentInfo);
studentRoute.route('/student/:id').get(appControl.showStudentInfo);
studentRoute.route('/student/:id').patch(appControl.updateStudentInfo);
studentRoute.route('/student/:id').delete(appControl.deleteStudentInfo);

module.exports = studentRoute;