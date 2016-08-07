var express = require('express');
var app = express();
var aggregate = require("./mongo-scripts/aggregate.js");
// var bodyParser  = require("body-parser")
app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));


//ROUTES
app.get('/', function(req, res) {
  res.render('dashboard.ejs');
});

app.get('/dept-data', function(req, res) {
    aggregate.byDept(req.query, function(err, data){
        if (err) console.log(err);
        res.json(data);
    });
});

app.get('/tmember-data', function(req, res) {
    aggregate.byTablingMember(req.query, function(err, data){
        if (err) console.log(err);
        res.json(data);
    });
});

app.get('/amember-data', function(req, res) {
    aggregate.byAnsweringMember(req.query, function(err, data){
        if (err) console.log(err);
        res.json(data);
    });
});

app.get('/date-data', function(req, res) {
    aggregate.byDay(req.query, function(err, data){
        if (err) console.log(err);
        res.json(data);
    });
});

app.get('/house-data', function(req, res) {
    aggregate.byHouse(req.query, function(err, data){
        if (err) console.log(err);
        res.json(data);
    });
});


app.get('*', function(req, res) {
    res.send("Page doesn't exists");
});

app.listen(process.env.PORT, process.env.IP,  function () {
  console.log('App ready');
});


