//Request JSON program with try/catch and callbacks

//first install the module!
var request = require("request");
//accessing our request mod, npm, library for the request function

var url = "http://pokeapi.co/api/v2/pokemon/134";

function requestJson(url, callback){
    request(url, function(err, pokemon){
        if(err){
            console.log("api not found");
            callback(err);
        }
        //in case there is an error, we tell our callback to process the error which will go
            //to our try/catch at the callback chain
        else{
            try{
                var nameArray = JSON.parse(pokemon.body).forms;
                var pokeName = nameArray[0].name;
                //the name is within the object, in position zero
                    //the object name is the position within the array
                    //we set the value of name to pokeName 
                    
                callback(null, pokeName);
                //use null for our err value and put in the new pokeName value
            }
            catch(error){
                console.log("JSON error" + nameArray);
                callback(error);
            }
            
        }
    });
}
//end of requestJson function



try{

   requestJson(url, function(err, value){
        if(err){
            console.log("Uh oh");
        }
        else{
            console.log("A wild " + value + " appeared!");
        }
    });
//calling request Json
    //inserted parameter values are url variable and a callback function
}
//end of try
catch(error){
    console.log("crap attack");
}



var myObj = {
    requestJS:  requestJson
};

module.exports = myObj;
