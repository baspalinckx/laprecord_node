
const assert = require('assert');
const Record = require('../model/record');


describe('Update records', () => {
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

    function assertWeather(operation, done) {
        operation
            .then(() => Record.find({}))
            .then((records) => {
                assert(records.length ===1);
                assert(records[0].weather === 'Sunny');
                done();
            });
    }

    it('instance set n save', (done) => {
        rec.set('weather', 'Sunny');
        assertWeather(rec.save(), done);

    });

    it('A model instance can update', (done) => {
        rec.update({weather: 'Sunny'});
        assertWeather(rec.update({weather: 'Sunny'}), done);

    });

    it('A model class can update', (done) =>{
        assertWeather(
            Record.update({weather: 'Rainy'}, {name: 'Sunny'}),
            done
        );

    });

    it ('A model cals can update one record', (done) =>{
        assertWeather(
            Record.findOneAndUpdate({ weather:'Rainy'}, {weather: 'Sunny'}),
            done
        );
    });

    it('A model class can find a record an Id and update ', (done)=>{
        assertWeather(
            Record.findByIdAndUpdate(rec._id, {weather: 'Sunny'}),
            done
        );
    });


});