var request = require("request");

var SynonymAPI = function(api){
    this.api = api;
};

module.exports = SynonymAPI;

SynonymAPI.prototype.getSynonyms = function(word, callback){
    request(this.api, function(err, objectData){
        if(err){
            callback(err);
        }
        else{
            var synData = JSON.parse(objectData);
            callback(null, synData);
        }
    })
};