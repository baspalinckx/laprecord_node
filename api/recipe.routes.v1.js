const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const recipes = require('../model/car');

routes.get('/recipes', function(req, res) {
    res.contentType('application/json');
    recipes.find({})
        .then((recipes) => {
        res.status(200).json({
            'succes': true,
            'recipe': recipes
        });
        })
        .catch((error) => res.status(400).json(error));
});


routes.get('/recipes/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    recipes.find({_id: id})
        .then((recipes) => {
            res.status(200).json({
                'succes': true,
                'recipe': recipes
            });
        })
        .catch((error) => res.status(400).json(error));
});


routes.post('/recipes', function(req, res) {
    const recipeProps = req.body;

    recipes.create(recipeProps)
        .then((recipes) => {
        res.status(200).send(recipes)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/recipes/:id', function(req, res) {
    res.contentType('application/json');
    const recipeId = req.params.id;
    const recipeProps = req.body;

    recipes.findByIdAndUpdate({_id: recipeId}, recipeProps)
        .then(()=> recipes.findById({_id: recipeId}))
        .then(driver => res.send(driver))
        .catch((error) => res.status(400).json(error))

});


routes.delete('/recipes/:id', function(req, res) {
    const id = req.param('id');
    recipes.findByIdAndRemove(id)
        .then((status) => res.status(200).json({
            'succes': true,
            'recipe': status
        }))
        .catch((error) => res.status(400).json(error))
});

module.exports = routes;