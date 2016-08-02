// Init the db with all records from the API

var request = require("request");
var rp = require('request-promise');
var Question = require("./question-model.js");


//10 items per page is the default
var url = "http://lda.data.parliament.uk/answeredquestions.json" +
    "?_view=AnsweredQuestions&_page=0";
    
var page = 0;
var max_page = 9596; //as of 2016-08-01
var master = function(){   
    if (page < max_page){
        console.log("################################");
        console.log("Getting page " + page);
        rp({
            url: url,
            json: true
        }).then(function (json) {
            //upload docs
            var hansard_items = json.result.items;
            upload_docs(hansard_items, 0);
            console.log("all uploaded");
            //run this function again with the next url
            url = json.result.next;
            console.log(url);
            page += 1;
            master();
            })
            .catch(function (err) {
                console.log("Fail");
                console.log(err) ;
                //Wait 30 seconds and try again;
                setTimeout(master, 30000);
            });
    }
};

//Run
master();
    




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
        date: new Date(hansard_item.answer.dateOfAnswer._value), //'yyyy-mm-dd'
        api_uin: hansard_item.uin
    }
    return clean_object
}

var upload_docs = function(hansard_items, uploaded){
    if(uploaded < 10){
        var clean = cleanResult(hansard_items[uploaded]);
        Question.create(clean, function (err, clean) {
                if (err) {
                    console.log(err);
                }
                console.log("saved " + uploaded);
                uploaded += 1;
                upload_docs(hansard_items, uploaded)
            })
        
    }
    
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

