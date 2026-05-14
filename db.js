const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: String,
    title: String,
    desc: String,
    link: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;