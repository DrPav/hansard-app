var express = require('express');
var app = express();
var aggregate = require("./mongo-scripts/aggregate.js")
// var bodyParser  = require("body-parser")
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
    aggregate.byDept(req.query, function(err, data){
        if (err) console.log(err);
        console.log(data)
        res.json(data)
    })
});

// Error Route
app.get('*', function(req, res) {
    res.send("Page doesn't exists");
});

app.listen(process.env.PORT, process.env.IP,  function () {
  console.log('App ready');
});


