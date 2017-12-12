const assert = require('assert');
const Record = require('../model/record')

describe('Creating records', () => {
    it('saves a rec', (done) => {
        const rec = new Record({
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
            .then(() => {
                assert(!rec.isNew);
                done();
            });
    });
});