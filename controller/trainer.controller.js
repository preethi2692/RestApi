const TrainerModel = require('../model/index').trainer;
const assert = require('assert');

module.exports = {
    trainerInfo: (req, res) => {
        // read all contacts
        TrainerModel.find((err, response) => {
            if(err) assert.equal(err, null);
            res.json(response);
        });
    },
    createTrainerInfo: (req, res) => {
        //adding the new contact
        let trainer = new TrainerModel(req.body);

        trainer.save().then((response) => {
            res.status(200).json({code: 200, message: " Trainer Info created" });
        }).catch((err) => {
            res.status(200).json({ code: 301, message: "unable to save trainer information" });
        });
    },
    showTrainerInfo: (req, res) => {
        //viewing single contact info
        let id = req.params.id;
        TrainerModel.findById({ _id: id }, (err, data) => {
            if(err) assert.equal(err, null);
            res.json(data);
        });
    },
    updateTrainerInfo: (req, res) => {
        let id = req.params.id;// read id from url address

        
        TrainerModel.findById({ _id: id }, (err, response) => {
            if(err) assert.equal(null, err);
            if(!response) {
                res.status(200).json({code: 301, message: 'no data found..'});
            } else {
                response.trainerId = req.body.trainerId;
                response.name = req.body.name;
                response.skills = req.body.skills;
                response.gender = req.body.gender;
                response.phone = req.body.phone;
                response.email = req.body.email;

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
    deleteTrainerInfo: (req, res) => {
        let id = req.params.id;

        TrainerModel.findByIdAndDelete({ _id: id}, (err, response) => {
            if(err) {
                assert.equal(null, err);
                res.status(200).json({ code: 301, message: "unable to delete" });
            } else {
                res.status(200).json({ code: 200, message: " Trainer Info deleted successfully" });
            }
        });
    },
};