const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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
    imagePath: {
        type: String,
        required: true
    }
});


const Car = mongoose.model('car', CarSchema);


module.exports={
    Car: Car
    , CarSchema : CarSchema
};