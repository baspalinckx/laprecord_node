const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngredientSchema = require('./ingredients').IngredientSchema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: String,
    ingredients: [IngredientSchema]

});


const Recipe = mongoose.model('recipe', RecipeSchema);

Recipe.count({}, function (err, count) {
 if(count < 5){
 console.log('voeg recipe toe');
 const recipe = new Recipe({
 name: 'Pizza',
 description: 'schijf deeg met dingen erop',
 imagePath: 'https://cdn.modpizza.com/wp-content/uploads/2016/11/mod-pizza-maddy-default-e1479167621575.png',
 ingredients: [
 {
 name: 'deeg',
 amount: 2
 },
 {
 name: 'tomaat',
     amount: 4
 },
 {
 name: 'vlees',
     amount: 1
 }
 ]
 }).save();
 }
 else {
 console.log('zit al een recipe in de db')
 }
 });




module.exports = Recipe;