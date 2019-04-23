require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");
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
   
     // "spotify-this-song" => use node-spotify-api to search for tracks in userInput
    function spotifyThis() {
      spotify.search({type: "track", query: `${userInput}`}, function(error, data){
        if (error){
          console.log(error)
        } else {
          console.log("========================================")
          console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
          console.log(`Title: ${data.tracks.items[0].name}`);
          console.log(`Preview: ${data.tracks.items[0].preview_url}`);
          console.log(`Album: ${data.tracks.items[0].album.name}`);
          console.log("========================================")
        }
      }
      )};
    
    
      // "movie-this" => use axios.get() to hit the omdb api to search for whatever movie is listed in userInput
    function omdbThis() {
      if(userInput===""){
        axios.get(`http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy`).then(
          function(response){
            console.log("========================================")
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Ratings[0]);
            console.log(response.data.Ratings[1]);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
            console.log("========================================")
          }
        )
      } else {
      axios.get(`http://www.omdbapi.com/?t=${userInput}&apikey=trilogy`).then(
        function (response) {
          console.log("========================================")
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.Ratings[0]);
          console.log(response.data.Ratings[1]);
          console.log(response.data.Country);
          console.log(response.data.Language);
          console.log(response.data.Plot);
          console.log(response.data.Actors);
          console.log("========================================")
        }
      )
      }
    }
    
    // "concert-this" => use axios.get() to hit the bandsintown api to search for concerts in userInput
    function bitThis() {
      axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`).then(
        function(response){
        for (var i = 0; i < response.data.length; i ++){
          console.log("========================================")
        console.log(response.data[i].venue.name);
        console.log(response.data[i].venue.city);
        console.log(response.data[i].datetime);
        console.log("========================================")
        }
        }
      )
    }
    

    // "do-what-it-says" => use 'fs' package to read random.txt, split the data in there into an Array, then feed that array[0] into the function
    function doIt() {
      fs.readFile("./random.txt", "utf8", function (error, data) {

      
        dataArr = data.split(",");
        
        result = dataArr[0];
        
        userInput = dataArr[1];

        switch (dataArr[0]) {
          case "concert-this":
              bitThis(userInput);
              break;
          case "spotify-this-song":
              spotifyThis(userInput);
              break;
          case "movie-this":
              ombdThis(userInput);
              break;
        }
        // checking for err
        if (error) {
          return console.log(err);
        }
      })
    }


  





