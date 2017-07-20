const mongoose = require('mongoose');
const database = 'mongodb://localhost/onebin'
mongoose.connect(database);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
})

db.once('open', () => {
    console.log("Mongo DB connected at",database);
})

module.exports = db;