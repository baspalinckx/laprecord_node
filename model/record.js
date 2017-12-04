const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CircuitSchema = require('./car').CircuitSchema;
const CarSchema = require('./circuit').CarSchema;

const RecordSchema = new Schema({
    time:{
        type: String,
        required: true
    } ,
    weather: {
        type: String,
        required: true
    },
    circuit: CircuitSchema,
    car: CarSchema

});

const Record = mongoose.model('records', RecordSchema);


};
module.exports = Record;
