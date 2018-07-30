require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keysMod = require('./keys');

var spotifyWithKey = new Spotify(keysMod.spotify);
// var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "my-tweets":
    console.log("twitter");
    //   total();
      break;
    
    case "spotify-this-song":
    console.log("spotify");
    //   deposit();
      break;
    
    case "movie-this":
    console.log("this movie");
    //   withdraw();
      break;
    
    case "do-what-it-says":
    console.log("do what it says");
    //   lotto();
      break;
    }