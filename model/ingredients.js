const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name:{
        type: String,
        required: true
    } ,
    amount: {
        type: Number,
        required: true
    },
});

const Ingredient = mongoose.model('ingredients', IngredientSchema);


module.exports={
    Ingredient: Ingredient
    , IngredientSchema : IngredientSchema
};