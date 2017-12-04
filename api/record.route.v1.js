const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const records = require('../model/record');

routes.get('/records', function(req, res) {
    res.contentType('application/json');
    records.find({})
        .then((records) => {
        res.status(200).json({
        'succes': true,
        'record': records
    });
})
.catch((error) => res.status(400).json(error));
});


routes.get('/records/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    records.find({_id: id})
        .then((records) => {
        res.status(200).json({
        'succes': true,
        'recipe': records
    });
})
.catch((error) => res.status(400).json(error));
});


routes.post('/records', function(req, res) {
    const recordProps = req.body;

    records.create(recordProps)
        .then((records) => {
        res.status(200).send(records)
})
.catch((error) => res.status(400).json(error))
});


routes.put('/records/:id', function(req, res) {
    res.contentType('application/json');
    const recordId = req.params.id;
    const recordProps = req.body;

    records.findByIdAndUpdate({_id: recordId}, recordProps)
        .then(()=> records.findById({_id: recordId}))
        .then(driver => res.send(driver))
        .catch((error) => res.status(400).json(error))

});


routes.delete('/records/:id', function(req, res) {
    const id = req.param('id');
    records.findByIdAndRemove(id)
        .then((status) => res.status(200).json({
        'succes': true,
        'records': status
    }))
.catch((error) => res.status(400).json(error))
});

module.exports = routes;