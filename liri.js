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

//     spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });
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