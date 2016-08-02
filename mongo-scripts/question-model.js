
//Mongooose stuff - put in a model folder and require
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hansardTest');
var textSearch = require('mongoose-text-search');

//Schema
var schema = new mongoose.Schema({
        heading: String,
        question: String,
        answer: String,
        department: String,
        house: Number,
        member_tabled: String,
        member_answered: String,
        date: Date,
        api_uin: {type: String, unique: true}
});

// give our schema text search capabilities 
schema.plugin(textSearch);
 // add a text index to the tags array 
schema.index({ answer: 'text', question: 'text' });

// var Question = mongoose.model("Question", schema)

module.exports = mongoose.model("Question", schema);
