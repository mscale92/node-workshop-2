//Request JSON program with try/catch and callbacks

//first install the module!
var request = require("request");
//accessing our request mod, npm, library for the request function
var prompt = require("prompt");




function pokemonNum(callback){
    var url = "http://pokeapi.co/api/v2/pokemon/";
    //var url has our url
    
    prompt.get("Enter a number between 1-151", function(err, userInput){
        if(err){
            console.log("damnit!")
            callback(err);
        }
        else{
            try{
                var num = userInput["Enter a number between 1-151"];
                var completeUrl = url.concat(num);
                //made our completeUrl as a concat of our url and number
                    //the number will access a pokemon
                callback(null, completeUrl);
                //send our new url to our callback so that our request
                    //function can use it
            }
            catch(error){
                console.log("well shit, prompt problems");
                callback(error);
            }
        }
    })
}

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
    pokemonNum(function(err,url){
        if(err){
            console.log("shit");
        }
        else{
            requestJson(url, function(err, value){
                if(err){
                    console.log("Uh oh");
                }
                else{
                    console.log("A wild " + value + " appeared!");
                }
            });
        }
});
//calling request Json
    //inserted parameter values are url variable and a callback function
}
//end of try
catch(error){
    console.log("crap attack");
}

exports.pokemonNum = pokemonNum();