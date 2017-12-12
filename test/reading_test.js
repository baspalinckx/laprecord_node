const assert = require('assert');
const Record = require('../model/record')

describe('Reading records out of the databaes', () => {
    let rec;


    beforeEach((done) => {
        rec = new Record({
                time: '15:05:02',
                weather: 'Rainy',
                circuit:
                    {
                        name: 'NurburgRing',
                        country: 'Germany',
                        length: '22KM',
                    },
                car:
                    {
                        brand: 'BMW',
                        model: '325i',
                        type: 'Coupe',
                        year: 1992,
                        modification: 'Coilovers, Upgraded brakes',
                        tire: 'Bridgetone Potenza',
                        imagePath: 'https://hips.hearstapps.com/roa.h-cdn.co/assets/17/17/1493231499-m3ring.jpg'
                    }


            }
        ),

        rec.save()
            .then(() => done());
    });

    it('find all records with weather of sunny', (done) =>{
        Record.find({weather: 'Sunny'})
            .then((rec) => {

                assert(rec[0]._id.toString() ===rec._id.toString());
                done();
            });
    });

    it('find records with an id', (done) => {
        Record.findOne({_id: rec._id })
            .then((rec) => {
                assert(rec.weather ==='Sunny');
                done();
            });
    });

    it('filter records on circuit name', (done) => {
        Record.find( {"circuit.name": ""})
            .then((records) => {
                res.status(200).json({
                    'record': records
                });
            })
    })
});
