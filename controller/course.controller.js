const CourseModel = require('../model/index').course;
const assert = require('assert');

module.exports = {
    courseInfo: (req, res) => {
        // read all contacts
        CourseModel.find((err, response) => {
            if(err) assert.equal(err, null);
            res.json(response);
        });
    },
    createCourse: (req, res) => {
        //adding the new contact
        let course = new CourseModel(req.body);

        course.save().then((response) => {
            res.status(200).json({code: 200, message: " Course created" });
        }).catch((err) => {
            res.status(200).json({ code: 301, message: "unable to save course" });
        });
    },
    showCourse: (req, res) => {
        //viewing single contact info
        let id = req.params.id;
        CourseModel.findById({ _id: id }, (err, data) => {
            if(err) assert.equal(err, null);
            res.json(data);
        });
    },
    updateCourse: (req, res) => {
        let id = req.params.id;// read id from url address

        
        CourseModel.findById({ _id: id }, (err, response) => {
            if(err) assert.equal(null, err);
            if(!response) {
                res.status(200).json({code: 301, message: 'no data found..'});
            } else {
                response.courseId = req.body.courseId;
                response.title = req.body.title;
                response.duration = req.body.duration;
                response.mode = req.body.mode;
                response.price = req.body.price;
                response.trainer = req.body.trainer;
                response.modules = req.body.modules;
                response.syllabus = req.body.syllabus;

                response
                .save()
                .then((obj) => {
                    res.status(200).json({ code: 200, message: 'successfully updated'});
                }).catch((err) => {
                    assert.equal(null, err);
                    res.status(200).json({code: 301, message: 'unable to update'});
                });
            }
        });
    },
    deleteCourse: (req, res) => {
        let id = req.params.id;

        CourseModel.findByIdAndDelete({ _id: id}, (err, response) => {
            if(err) {
                assert.equal(null, err);
                res.status(200).json({ code: 301, message: "unable to delete" });
            } else {
                res.status(200).json({ code: 200, message: " Course deleted successfully" });
            }
        });
    },
};