require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv[3];
theSwitch();
function theSwitch() {
    switch (command) {
        case "do-what-it-says":
            weirdStuff(input);
            break;
        case "concert-this":
            concertCheck(input);
            break;
        case "spotify-this-song":
            spotifyCheck(input);
            break;
        case "movie-this":
            movieCheck(input);
            break;
        default:
            console.log("Invalid command. Try again.")
            break;
    }
}

function concertCheck(artist){
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        
        .then(function(response) {
            // console.log(response.data);
            if (response.data[0] != null) {
                console.log(artist + " is playing at:")
                for (var i = 0; i < response.data.length; i++) {
                    console.log("* " + response.data[i].venue.name + " *");
                    if (response.data[i].venue.region) {
                        console.log("     " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                    } else {
                        console.log("     " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    };
                    var concertDate = moment(response.data[i].datetime).format("M/D/YYYY");
                    console.log("     " + concertDate);
                };
            } else {
                console.log("That artist or band is not on tour at this time.");
            };
        })

        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function spotifyCheck(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(JSON.stringify(data.tracks.items[0], null, 2));
      for (var j = 0; j < data.tracks.items.length; j++) {
        for (var artistsIndex = 0; artistsIndex < data.tracks.items[j].artists.length; artistsIndex++) {
                console.log("Artist(s): " + data.tracks.items[j].artists[artistsIndex].name);
            };
        console.log("Track Name: " + data.tracks.items[j].name);
        if (data.tracks.items[j].preview_url) {
            console.log("Preview: " + data.tracks.items[j].preview_url);
        } else {
            console.log("Preview: unavailable");
        }
        console.log("Album Title: " + data.tracks.items[j].album.name);
        }
    })
}

function movieCheck(title) {
    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + title)
        .then(function (movieInfo) {
            // console.log(movieInfo.data);
            console.log("Title: " + movieInfo.data.Title)
            console.log("Year Released: " + movieInfo.data.Year);
            console.log("IMDB Rating: " + movieInfo.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieInfo.data.Ratings[1].Value);
            console.log("Producing Country or Countries: " + movieInfo.data.Country);
            console.log("Language: " + movieInfo.data.Language);
            console.log("Plot: " + movieInfo.data.Plot);
            console.log("Actors: " + movieInfo.data.Actors);
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function weirdStuff() {
    fs.readFile("random.txt","utf8", function (err, data) {
        if (err) {
            return console.log(error);
          }
        console.log(data);
        var splitText = data.split(",")
        console.log(splitText);
        command = splitText[0];
        input = splitText[1];
        theSwitch();
    })
}