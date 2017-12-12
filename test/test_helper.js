const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost:27017');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { record, circuit, car } = mongoose.connection.collections;
    record.drop(() => {
        circuit.drop(() => {
            done();
        });
            car.drop(() => {
                done();
            });
        });
});