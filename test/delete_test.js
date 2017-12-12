const assert = require('assert');
const Record = require('../model/record');

describe('Deleting a record', () => {
    let rec;

    beforeEach((done) => {
        rec = new Record({ time: '1:00:00'}, {weather: 'Sunny'});

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



