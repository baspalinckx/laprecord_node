const assert = require('assert');
const Record = require('../model/record');

describe('Deleting a record', () => {
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
        )

        rec.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        //remove specific to Joe
        rec.remove()
            .then(() => Record.findOne({time: '1:00:00'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        //Remove a bunh of records with some given criteria
        Record.remove({time: '1:00:00'})
            .then(() => Record.findOne({time: '1:00:00'}))
            .then((user) => {
                assert(user ===null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        Record.findOneAndRemove({time: '1:00:00'})
            .then(() => Record.findOne({time: '1:00:00'}))
            .then((user) => {
                assert(user ===null);
                done();
            });
    });

    it('class method findByIdAndRemove ', (done) => {
        Record.findByIdAndRemove(rec._id)
            .then(() => Record.findOne({time: '1:00:00'}))
            .then((user) => {
                assert(user ===null);
                done();
            });
    });
});



