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

Record.count({}, function (err, count) {
    if(count < 5){
        console.log('voeg recipe toe');
        const Record = new Record({
            time: '2:05:02',
            weather: 'Sunny',
            circuit:
                {
                    name: 'Circuit of Zandvoort',
                    country: 'The Netherlands',
                    length: '4,3 KM'
                },
            car:
                {
                    brand: 'Mazda',
                    model: 'MX-5',
                    type: 'Roadster',
                    year: 1992,
                    modification: 'Coilovers, Upgraded brakes',
                    tire: 'Advan Neova AD08R'
                }


        }).save();
    }
    else {
        console.log('zit al een record in db')
    }
});


module.exports = Record;
