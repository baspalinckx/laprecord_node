const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const records = require('../model/record');
const cars = require('../model/car').Car;
const circuits = require('../model/circuit');
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://hobby-iklebjifjhecgbkehfnegjal.dbs.graphenedb.com:24786", neo4j.auth.basic("record-database", "b.KKWY4XBJptva.Uc1tSLYbM5h8ZdSG"));
const session = driver.session();



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

routes.get('/records/circuit/:name/cars', function(req, res) {
    const circuitParam = req.param('name');
    const resultPromise = session.writeTransaction(tx => tx.run(
        "MATCH (circuit { name: {circuitParam} })--(car)" +
        "RETURN car", {circuitParam: circuitParam}));

    resultPromise.then(result => {
        var carsArray = [];
        result.records.forEach(function (records) {
            carsArray.push({
                brand: records._fields[0].properties.name,
                model: records._fields[0].properties.model

            });

            res.status(200).json({
                'cars': carsArray
            });

        })
            .catch((error) => res.status(400).json(error));
    });
});


routes.post('/records', function(req, res) {
    const recordProps = req.body;
    const recordCircuitNameProp = req.body.circuit.name;
    const recordCarBrandProp = req.body.car.brand;
    const recordCarModelProp = req.body.car.model;



    records.create(recordProps)
        .then((records) => {
        res.status(200).send(records)

})

.catch((error) => res.status(400).json(error))

    session
        .run("MERGE(c:Circuit {name:{circuitParam}})" +
            "MERGE(ca:Car {name:{carParam}, model:{modelParam}})" +
            "CREATE (ca)-[r:RACED_ON]->(c)", {circuitParam: recordCircuitNameProp, carParam: recordCarBrandProp, modelParam: recordCarModelProp})
        .then(function(result){
            res.redirect('/');
            session.close();
        })
        .catch(function(error){
            console.log(error);
        });

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