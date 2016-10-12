//Return a five day weather forecast using user info and apis
//Display in a "nice" way

//also use request-json.js mod

var req = require("./library/request-json.js");
//the variable used to request our api data.

var prompt = require("prompt");

var emoji = require('node-emoji');

function weatherForecast(weatherCoor, callback){
    var weatherUrl = "https://api.darksky.net/forecast/f90227ab9f53a3d6c4ca0b9d7cea89d4/";
    weatherUrl = weatherUrl.concat(weatherCoor);
    //must add the coordinates from the user's location, weatherCoor, to the weather url
    
    req.requestJS(weatherUrl, function(err, dataWeather){
        if(err){
            console.log("error shit");
        }
        
        else{
            
            var dataArray = dataWeather.daily.data;
            var fiveDaysArray = dataArray.filter(function(day, idx){
                if(idx < 5){
                    return day;
                }
            });
            
            var fiveDaysForecast = fiveDaysArray.map(function(day){
                return {icon: day.icon,
                    summary: day.summary,
                    tempHigh: day.temperatureMax,
                    tempLow: day.temperatureMin,
                    date: day.time
                };
                //we want four points of data for each day
                    //the days are number/called via their position in the array
                    //the days contain objects as their value with a summary, an icon
                    //and temp high and low for the day.
            });
            
            // console.log("yellow");
            callback(null, fiveDaysForecast);
        }
    });
}
//end of weatherForecast function


function userLonLat(userLoca, callback){
    var googleMaps = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    userLoca = userLoca.split('');
    userLoca = userLoca.join('');
    //split join to omit user input strings with spaces
    
    var locaUrl = googleMaps.concat(userLoca);
    
    req.requestJS(locaUrl, function(err, userData){
        if(err){
            callback(err);
        }
        
        else{
            var lonLatObj = userData.results[0];
            var userCoordinates = [lonLatObj.geometry.location.lat, lonLatObj.geometry.location.lng];
            
            // console.log("red");
            
            callback(null, userCoordinates);
        }
    });
}
//end of userLonLat function


function dayOfTheWeek(forecast){
    
    
    var daysWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var days = forecast.map(function(day){
        var unix = new Date(day.date *1000);
        //conver date to unix by multiply by 1000, milliseconds is what JS likes
        unix = unix.getDay();
        //get the day of the week using the getDay method
            //getDay returns a number 0-6 that represents Sun-Sat respectively
        return unix;
        //return our new array
        
    }).reduce(function(array, dayofWeek, idx){
        //we need to put names to our numbers
        if(idx === 0){
            array.push("Today");
            return array;
            //our current day is today which will always be first
        }
        else if(idx === 1){
            array.push("Tomorrow");
            return array;
            //tomorrow will always be one more than today, second
        }
        else{
            array.push(daysWeekArray[dayofWeek]);
            return array;
            //all other days are named using their values in the daysWeekArray
                //the daysWeekArray has all days in chronologically order
                //Sunday will always be daysWeekArray[0]
                //meaning if we have Sunday's value, zero, we can access
                //the string in daysWeekArray by imputting zero
        }
    }, []);
    // end of map/reduce methods
    
    var wordyForecast = forecast.reduce(function(array, day, idx){
       day["date"] = days[idx];
       array.push(day);
           if(day.icon.indexOf("cloudy") >= 0){
               day["icon"] = emoji.get('cloud');
               return array
           }
           else if(day.icon.indexOf("sun") >= 0){
               day["icon"] = emoji.get('sunny');
               return array
           }
           else if(day.icon.indexOf("rain") >= 0){
               day["icon"] = emoji.get('umbrella');
               return array
           }
           else if(day.icon.indexOf("clear") >= 0){
               day["icon"] = emoji.get("large_blue_circle");
               return array
           }
           
            else{
                return array;
            }
    }, []).map(function(day){
        return [day.date, day.icon, day.summary, "High of " + day.tempHigh + " degrees Fahrenheit", "Low of  " + day.tempLow + " degrees Fahrenheit"].join("\n");
    });
    //end of reduce function 
        //this function replaces the date data, which is in unix, 
        //with the names of the week
    var prettyForecast = wordyForecast.join('\n');
    // console.log("blue");
    console.log(prettyForecast);
}
//end of dayoftheweek forecast
    //replaces date data with days of the week and organizes data into
    //an appropriate output
    
    

function userCity(callback){
    prompt.get("Enter your current city", function(err, userInput){
        if(err){
            
        }
        else{
            var city = userInput["Enter your current city"];
            callback(null, city);
        }
    });
}
//end of userCity function


//Calling all functions!
userCity(function(err, city){
    if(err){
        
    }
    else{
    userLonLat(city, function(err, userCoordinates){
        //city is user input string
        if(err){
            
        }
        else{
            var weatherCoor = userCoordinates.join();
            //no separator, the weather url requires a comma.
            // console.log("orange");
            
            weatherForecast(weatherCoor, function(err, forecast){
                //weatherCoor is userCoordinates, lat lon, as a string
                if(err){
                    
                }
                else{
                    
                    //forecast is an array 
                        //each day is each position in the array
                        //each position has an object with four points of data
                        //summary, icon, tempHigh, tempLow, and date
                        
                    // console.log("green");
                    
                    dayOfTheWeek(forecast);
                    //forecast is the object of data of the weather forecast
                    //from the user location
                }
            });
            //end of weatherForecast call
        }
    })
    //end of userLonLat call
    }
});
//end of userCity call

//End of call chain