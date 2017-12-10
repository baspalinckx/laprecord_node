const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CircuitSchema = new Schema({
    name:{
        type: String,
        required: true
    } ,
    country: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    }

});

const Circuit = mongoose.model('circuits', CircuitSchema);


module.exports={
    Circuit: Circuit
    , CircuitSchema : CircuitSchema
};