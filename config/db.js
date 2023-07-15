const mongoose = require('mongoose');
const db = mongoose.connection;
const dbURI = process.env.DATABASE_URI;

mongoose.set('strictQuery', false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDB');
    }
);

exports.db = db;