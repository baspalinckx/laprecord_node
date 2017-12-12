const assert = require('assert');
const Record = require('../model/record')

describe('Creating records', () => {
    it('saves a rec', (done) => {
        const rec = new Record({ time: '1:00:00'}, {weather: 'Sunny'});

        rec.save()
            .then(() => {
                assert(!rec.isNew);
                done();
            });
    });
});