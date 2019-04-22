require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var request = process.argv[2]
var userInput = process.argv.slice(3).join(" ")

// use switch statement to figureout what function to run based on the value of "request"
switch (request) {
    case "spotify-this-song":
      spotifyThis();
      break;
   
    case "movie-this":
      omdbThis();
      break;
   
    case "concert-this":
      bitThis();
      break;
   
    case "do-what-it-says":
      doIt();
      break;
    }




// "concert-this" => use axios.get() to hit the bandsintown api to search for concerts in userInput

// "spotify-this-song" => use node-spotify-api to search for tracks in userInput

// "movie-this" => use axios.get() to hit the omdb api to search for whatever movie is listed in userInput

// "do-what-it-says" => use 'fs' package to read random.txt, split the data in there into an Array, then feed that array[0] into the function