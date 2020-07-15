const ContactModel = require('../model/index').contact;
const assert = require('assert');

module.exports = {
    allContact: (req, res) => {
        // read all contacts
        ContactModel.find((err, response) => {
            if(err) assert.equal(err, null);
            res.json(response);
        });
    },
    createContact: (req, res) => {
        //adding the new contact
        let contact = new ContactModel(req.body);

        contact.save().then((response) => {
            res.status(200).json({code: 200, message: " Contact created" });
        }).catch((err) => {
            res.status(200).json({ code: 301, message: "unable to save contact" });
        });
    },
    showContact: (req, res) => {
        //viewing single contact info
        let id = req.params.id;
        ContactModel.findById({ _id: id }, (err, data) => {
            if(err) assert.equal(err, null);
            res.json(data);
        });
    },
    updateContact: (req, res) => {
        let id = req.params.id;// read id from url address

        
        ContactModel.findById({ _id: id }, (err, response) => {
            if(err) assert.equal(null, err);
            if(!response) {
                res.status(200).json({code: 301, message: 'no data found..'});
            } else {
                response.name = req.body.name;
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
    deleteContact: (req, res) => {
        let id = req.params.id;

        ContactModel.findByIdAndDelete({ _id: id}, (err, response) => {
            if(err) {
                assert.equal(null, err);
                res.status(200).json({ code: 301, message: "unable to delete" });
            } else {
                res.status(200).json({ code: 200, message: " Contact deleted successfully" });
            }
        });
    },
};