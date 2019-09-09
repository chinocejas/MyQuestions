'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = schema({
    name: String,
    surname: String,
    aka: String,
    email: String,
    created: Date,
    
    
});

module.exports = mongoose.model('User',userSchema);  