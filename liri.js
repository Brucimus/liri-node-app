require("dotenv").config();

var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keysMod = require('./keys');

var spotify = new Spotify(keysMod.spotify);
// var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];


switch (action) {
    case "my-tweets":
    console.log("twitter");
    //   twitterer(value);
      break;
    
    case "spotify-this-song":
    console.log("spotify");
      spotifier(value);
      break;
    
    case "movie-this":
      movier(value);
      break;
    
    case "do-what-it-says":
    console.log("do what it says");
    //   doer();
      break;
    }

function spotifier(movieInput) {

}
    
function movier(movieInput) {
    request("http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
    });
}