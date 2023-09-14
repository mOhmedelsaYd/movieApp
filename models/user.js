const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    moviename: {
        type: String,
        required: true,
    },
    time: {
        type: String
    },
    year: {
        type : Number
    },
    rate: {
        type : Number
    }
});

const User = mongoose.model('User', schema);
User.on('index', err => console.error(err));
module.exports = User;