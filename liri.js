//dotenv requirements
require("dotenv").config();

//other module requirements
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keysMod = require('./keys');
var moment = require('moment');

//call spotify and twitter info from keys.js file
var spotify = new Spotify(keysMod.spotify);
var client = new Twitter(keysMod.twitter);

//arguments to variables
var action = process.argv[2];

//allows arguments to be made without the need of quotations
var value = process.argv.slice(3).join(" ");

//switch to determine action based on first argument
switch (action) {
    case "my-tweets":
      twitterer(value);
      break;
    
    case "spotify-this-song":
      spotifier(value);
      break;
    
    case "movie-this":
      movier(value);
      break;
    
    case "do-what-it-says":
      doer();
      break;
      
    default:
        console.log("Invalid Argument");
    }

//twitter function to call twitter info
function twitterer() {
    client.get('statuses/user_timeline', function(error, tweets) {
        if(error) throw error;

        //works backwards so that the earliest tweets show up first
        for (i = 19; i > -1 ; i--) {

            //if there are less than 20 tweets, print the number of tweets there are
            if (tweets[i]) {

                //change tweet date format to local and a more legible date time format
                var temp = moment(tweets[i].created_at,"ddd MMM D HH:mm:ss ZZ YYYY").local().format("h:mma M/D/YY");
                console.log("\nCreated: " + temp + "\nTweet: " + tweets[i].text + "\n\n------------------------------")
            }
        }
      });
}

//spotifier function to call spotify info
function spotifier(songInput) {
    spotify.search({ type: 'track', query: songInput, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
        console.log("Song: " + JSON.stringify(data.tracks.items[0].name));
        console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url));
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
    });
}

//movier function to call omdb info
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

//doer function to call spotifier function based on arguments listed in random.txt file 
function doer() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        var toArray = data.split(",");
        spotifier(toArray[1]);
    });
}