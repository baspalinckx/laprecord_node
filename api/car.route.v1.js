const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const cars = require('../model/car').Car;




// routes.get('/cars', function(req, res) {
//     res.contentType('application/json');
//     cars.find({})
//         .then((cars) => {
//             res.status(200).json({
//                 'cars': cars
//             });
//         })
//         .catch((error) => res.status(400).json(error));
// });
 module.exports = routes;
