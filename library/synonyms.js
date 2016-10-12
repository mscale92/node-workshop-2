var request = require("request");

var SynonymAPI = function(api){
    this.api = api;
};

module.exports = SynonymAPI;

SynonymAPI.prototype.getSynonyms = function(word, callback){
    var url = this.api;
    url = url.concat(word);
    //adding the user word to the url
    url = url.concat("/json");
    //adding /json onto the end of the url
    
    request(url, function(err, objectData){
        if(err){
            callback(err);
        }
        else{
            var synData = JSON.parse(objectData.body);
            console.log("blue");
            callback(null, synData);
        }
    })
};