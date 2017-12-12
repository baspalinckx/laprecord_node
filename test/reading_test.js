const assert = require('assert');
const Record = require('../model/record')

describe('Reading users out of the databaes', () => {
    let rec;


    beforeEach((done) => {
        rec = new Record({ time: '1:00:00'}, {weather: 'Sunny'});
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
});
