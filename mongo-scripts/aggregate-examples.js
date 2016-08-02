//Attempt to aggregate the results of the test db

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hansardTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

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
        api_uin: String
})

var Question = mongoose.model("Question", schema)
//Put the above into a model and require it

// NEW Code here //
//Count the number in a query
Question.find().find({department:'Transport'}).exec(function(err, questions) {
    if(err) console.log(err);
    console.log(questions.length);
});

Question.aggregate()
    .group({_id: '$department', count: {$sum: 1}})
    .sort('-count')
    .exec(function (err, res){
        if (err) return console.log(err);
        console.log(res)
    })
    
//Now need to add a search at the start of the pipelone
//Looks like a match statement
Question.aggregate({ $match: {house: 1}})
    .group({_id: '$department', count: {$sum: 1}})
    .sort('-count')
    .exec(function (err, res){
        if (err) return console.log(err);
        console.log(res)
    })
    
Question.find().count(function(err, count){
    if (err) return console.log(err);
    console.log("Number of docs: ", count );
});