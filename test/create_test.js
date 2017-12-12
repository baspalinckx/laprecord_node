const assert = require('assert');
const User = require('../model/record')

describe('Creating records', () => {
    it('saves a rec', (done) => {
        const rec = new User({ time: '1:00:00'}, {weather: 'Sunny'});

        rec.save()
            .then(() => {
                assert(!rec.isNew);
                done();
            });
    });
});