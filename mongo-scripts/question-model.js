//Mongooose stuff - put in a model folder and require
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hansardTest');

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


 // add a text index to fields to allow full text search on them
schema.index({ answer: 'text', question: 'text'});

//Export
module.exports = mongoose.model("Question", schema);


