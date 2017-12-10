const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const records = require('../model/record');
const cars = require('../model/car').Car;
const circuits = require('../model/circuit');



routes.get('/records', function(req, res) {
    res.contentType('application/json');
    records.find({})
        .then((records) => {
        res.status(200).json({
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
        'record': records
    });
})
.catch((error) => res.status(400).json(error));
});

routes.get('/records/car/:brand', function(req, res) {
    res.contentType('application/json');
    const brandParam = req.param('brand');
    console.log(brandParam);
    records.find( {"car.brand": brandParam})
        .then((records) => {
            res.status(200).json({
               'record': records
            });
        })
        .catch((error) => res.status(400).json(error));
});



routes.get('/records/circuit/:name', function(req, res) {
    res.contentType('application/json');
    const circuitParam = req.param('name');
    console.log(circuitParam);
    records.find( {"circuit.name": circuitParam})
        .then((records) => {
            res.status(200).json({
                'record': records
            });
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/records/circuit/:name/car/:brand', function(req, res) {
    res.contentType('application/json');
    const circuitParam = req.param('name');
    const carParam = req.param('brand');
    console.log(circuitParam);
    records.find( {"circuit.name": circuitParam,
    "car.brand" : carParam})
        .then((records) => {
            res.status(200).json({
                'record': records
            });
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/circuits       ', function(req, res) {
    res.contentType('application/json');
    records.find({}, { _id: 0, time: 0, weather: 0 , circuit: 0, car: 1, __v: 0  })
        .then((brands) => {
            res.status(200).json({
                'records': brands
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
        'record': status
    }))
.catch((error) => res.status(400).json(error))
});

module.exports = routes;