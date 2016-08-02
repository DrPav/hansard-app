// Init the db with 100 records from the API

var request = require("request");

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
    

//URL to get 100 items 
var url = "http://lda.data.parliament.uk/answeredquestions.json" +
    "?_view=AnsweredQuestions&_pageSize=100&_page=0";

// Use recursive functions to wait for callbacks to complete
// http://www.richardrodger.com/2011/04/21/node-js-how-to-write-a-for-loop-with-callbacks/#.V55-obgrKUk
// Couldn't get to work. Probably best to have a python script populating the
// DB when running live

request({
    url: url,
    json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            url = body.result.next;
            var hansard_items = body.result.items ;
            var count = 1
            hansard_items.forEach(function(hansard_item){
                var clean = cleanResult(hansard_item);
                Question.create(clean, function (err, clean) {
                    if (err) return console.log(err);
                    console.log("saved " + count);
                    count += 1
                })
            })
        }   
    })




var cleanResult = function(hansard_item){
    //Function takes a single Answered Question from the Hansard API
    //Contain in the array from result.items in the json file
    var clean_object = {
        heading: hansard_item.hansardHeading._value,
        question: hansard_item.questionText,
        answer: hansard_item.answer.answerText._value, //contains html
        department: hansard_item.answeringDeptShortName._value,
        house: hansard_item.houseId._value,
        member_tabled: hansard_item.tablingMemberPrinted[0]._value,
        member_answered: hansard_item.answer.answeringMemberPrinted._value,
        date: new Date(hansard_item.date._value), //'yyyy-mm-dd'
        api_uin: hansard_item.uin
    }
    return clean_object
}

