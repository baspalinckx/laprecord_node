const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const Recipe = require('../model/recipe.model');
const ingredients = require('../model/ingredients').Ingredient;

routes.get('/ingredients', function(req, res) {
    res.contentType('application/json');
    ingredients.find({})
        .then((ingredients) => {
            res.status(200).json({
                'succes': true,
                'ingredients': ingredients
            });
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/ingredients/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    ingredients.find({_id: id})
        .then((ingredients) => {
            res.status(200).json({
                'succes': true,
                'recipe': ingredients
            });
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/ingredients', function (req, res) {
    const ingredientProps = req.body;

    ingredients.create(ingredientProps)
        .then((ingredients) => {
            res.status(200).send(ingredients)
        })
        .catch((error)=> res.status(400).json(error))
});

routes.delete('/ingredients/:id', function(req, res) {
    const id = req.param('id');
    ingredients.findByIdAndRemove(id)
        .then((status) => res.status(200).json({
            'succes': true,
            'ingredients': status
        }))
        .catch((error) => res.status(400).json(error))
});

routes.put('/ingredients/:id', function(req, res) {
    res.contentType('application/json');
    const ingredientId = req.params.id;
    const ingredientProps = req.body;

    ingredients.findByIdAndUpdate({_id: ingredientId}, ingredientProps)
        .then(()=> ingredients.findById({_id: ingredientId}))
        .then(ingredients => res.send(ingredients))
        .catch((error) => res.status(400).json(error))

});


module.exports = routes;