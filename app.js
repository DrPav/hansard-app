var express = require('express');
var app = express();
// var bodyParser  = require("body-parser")
var mongo_question = require("./mongo-scripts//question-model.js") ;
app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));






// Home Route
app.get('/', function(req, res) {
  res.render('dashboard.ejs');
});

// Get the dept data
app.get('/dept-data', function(req, res) {
        var search_string = req.query.q;
    console.log("search term is " + search_string);
    mongo_question.aggregate()
    .group({_id: '$department', count: {$sum: 1}})
    .sort('-count')
    .exec(function (err, data){
        if (err) return console.log(err);
        res.json(data);
    });
});

// Error Route
app.get('*', function(req, res) {
    res.send("Page doesn't exists");
});

app.listen(process.env.PORT, process.env.IP,  function () {
  console.log('App ready');
});

