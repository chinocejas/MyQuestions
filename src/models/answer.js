'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var answerSchema = schema({
    user:       {type: schema.ObjectId, ref:'User'},
    question:   {type: schema.ObjectId, ref:'Question'},
    answer: String,
    created: Date,
    modified: Date
    
});

module.exports = mongoose.model('Answer',answerSchema);  