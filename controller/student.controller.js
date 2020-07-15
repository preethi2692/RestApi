const StudentModel = require('../model/index').student;
const assert = require('assert');

module.exports = {
    studentInfo: (req, res) => {
        // read all contacts
        StudentModel.find((err, response) => {
            if(err) assert.equal(err, null);
            res.json(response);
        });
    },
    createStudentInfo: (req, res) => {
        //adding the new contact
        let student = new StudentModel(req.body);

        student.save().then((response) => {
            res.status(200).json({code: 200, message: " Student Info created" });
        }).catch((err) => {
            res.status(200).json({ code: 301, message: "unable to save student info" });
        });
    },
    showStudentInfo: (req, res) => {
        //viewing single contact info
        let id = req.params.id;
        StudentModel.findById({ _id: id }, (err, data) => {
            if(err) assert.equal(err, null);
            res.json(data);
        });
    },
    updateStudentInfo: (req, res) => {
        let id = req.params.id;// read id from url address

        
        StudentModel.findById({ _id: id }, (err, response) => {
            if(err) assert.equal(null, err);
            if(!response) {
                res.status(200).json({code: 301, message: 'no data found..'});
            } else {
                response.studentId = req.body.studentId;
                response.name = req.body.name;
                response.gender = req.body.gender;
                response.phone = req.body.phone;
                response.email = req.body.email;
                response.courseId = req.body.courseId;
                //response.status = req.body.status;

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
    deleteStudentInfo: (req, res) => {
        let id = req.params.id;

        StudentModel.findByIdAndDelete({ _id: id}, (err, response) => {
            if(err) {
                assert.equal(null, err);
                res.status(200).json({ code: 301, message: "unable to delete" });
            } else {
                res.status(200).json({ code: 200, message: " Student Info deleted successfully" });
            }
        });
    },
};