require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "concert-this":
        concertCheck(input);
        break;
    case "spotify-this-song":
        spotifyCheck(input);
        break;
    default:
        break;
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
       
    //   console.log(data.tracks.items[0].album);
      for (var j = 0; j < data.tracks.items.length; j++) {
        for (var artistsIndex = 0; artistsIndex < data.tracks.items[j].album.artists.length; artistsIndex++) {
                console.log("Artist(s): " + data.tracks.items[j].album.artists[artistsIndex].name);
            };
        }
    })
}