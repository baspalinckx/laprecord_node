const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    modification: {
        type: String,
        required: true
    },
    tire: {
        type: String,
        required: true
    },
    imagePath: String,

});


const Car = mongoose.model('car', CarSchema);

/*
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
*/
module.exports={
    Car: Car
    , CarSchema : CarSchema
};