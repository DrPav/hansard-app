var express = require('express');
var app = express();
var bodyParser  = require("body-parser")
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));

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
})
var Question = mongoose.model("Question", schema)



// Home Route
app.get('/', function(req, res) {
  res.render('dashboard.ejs');
});

// Get the dept data
app.get('/dept-data', function(req, res) {
    Question.aggregate()
    .group({_id: '$department', count: {$sum: 1}})
    .sort('-count')
    .exec(function (err, data){
        if (err) return console.log(err);
        res.json(data)
    })
});

app.listen(process.env.PORT, process.env.IP,  function () {
  console.log('App ready');
});

