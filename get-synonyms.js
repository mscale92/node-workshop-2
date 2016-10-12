//use the synonym mod to look up a word in the thesaurus url and spit out synonyms and
//antonyms of the word 

var SynonymAPI = require("./library/synonyms.js");
//our mod

var prompt = require("prompt");
//prompt mod



var thesaurus = new SynonymAPI("http://words.bighugelabs.com/api/2/eaa318cac47bae8bc7eda6f6aacfaa38/");
//thesaurus object with the thesaura url


function userWord(callback){
    prompt.get("Enter a word", function(err, userInput){
        if(err){
            callback(err);
        }
        else{
            callback(null, userInput["Enter a word"]);
        }
    });
}
//userWord function
    //takes a word from a user

userWord(function(err, word){
    if(err){
        console.log("oh no, error");
    }
    thesaurus.getSynonyms(word, function(err, value){
        if(err){
            console.log("uh oh, error");
        }
        //err handling
        else{
            
            console.log(value);
        }
    })
});