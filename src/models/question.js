'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var questionSchema = schema({
    question: String,
    created: Date,
    rating: Number,
    answered: Number
});

module.exports = mongoose.model('Question',questionSchema);  