const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CircuitSchema = require('./circuit').CircuitSchema;
const CarSchema = require('./car').CarSchema;

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

const Record = mongoose.model('record', RecordSchema);

Record.count({}, function (err, count) {
    if(count < 2){
        records.remove({});
        console.log('voeg record toe');
        const record1 = new Record({
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


        }
        ).save();

        const record2 = new Record({
                time: '15:05:02',
                weather: 'Rainy',
                circuit:
                    {
                        name: 'NurburgRing',
                        country: 'Germany',
                        length: '22KM'
                    },
                car:
                    {
                        brand: 'BMW',
                        model: '325i',
                        type: 'Coupe',
                        year: 1992,
                        modification: 'Coilovers, Upgraded brakes',
                        tire: 'Bridgetone Potenza'
                    }


            }
        ).save();


    }
    else {
        console.log('zit al een record in db')
    }
});


module.exports = Record;
