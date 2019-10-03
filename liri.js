// To start, we put in several references to several packages we need to make this program run.
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//Here we point Spotify to keys.js, which in turn points to the .env file where our key and secret are actually stored.
var spotify = new Spotify(keys.spotify);

// Here we get the user's inputs and save them as variables to use later.
var command = process.argv[2];
var input;

// Had to include this if else statement to make setting a default value for spotify-this-song work. Without it, we get an empty string rather than null.
if(process.argv.slice(3).join(" ")) {
    input = process.argv.slice(3).join(" ");
} else {
    input = null;
}
// This is the variable we will append to log.txt
var searchOutput = [];

// theSwitch is just what it's named. It checks which command the user inputted and sends their input to the appropriate function.
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
            console.log("Invalid command. Try again.");
            break;
    }
}

//This function handles the user command 'concert-this'
function concertCheck(artist){
    // Here we use axios to make an api call to bands in town and do a search for the artist the user provided.
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        
        .then(function(response) {
            searchOutput = [];
            if (response.data[0] != null) {
                var header = artist + " is playing at:";
                // For each piece of info, we console log it, then push it to the searchOutput array so we can append it to log.txt later. You'll see this repeated for the other functions.
                console.log(header);
                searchOutput.push(header);
                for (var i = 0; i < response.data.length; i++) {
                    var venueName = response.data[i].venue.name
                    console.log(venueName);
                    searchOutput.push(venueName);
                    var location;
                    if (response.data[i].venue.region) {
                        location = "     " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country
                        console.log(location);
                        searchOutput.push(location);
                    } else {
                        location = "     " + response.data[i].venue.city + ", " + response.data[i].venue.country
                        console.log(location);
                        searchOutput.push(location);
                    };
                    var concertDate = "     " + moment(response.data[i].datetime).format("M/D/YYYY");
                    console.log(concertDate);
                    searchOutput.push(concertDate);
                };
            } else {
                console.log("That artist or band is not on tour at this time.");
            };
            // This is the function we use to write to the log.txt file.
            fileMaker();
        })
        // I grabbed the following error catching code from one of our class activities.
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

// This function handles the user command 'spotify-this-song.'
function spotifyCheck(song) {
    // If the user doesn't input a song of their own to search, we default to searching for 'The Sign' by Ace of Base.
    if (song == null) {
        song = "The Sign Ace of Base";
    }
    // This is where we use the node-spotify-app package to search for infomation about the song the user provided.
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        searchOutput = [];
        for (var j = 0; j < data.tracks.items.length; j++) {
            for (var artistsIndex = 0; artistsIndex < data.tracks.items[j].artists.length; artistsIndex++) {
                // Again, we save the info as a variable, then console.log the variable and push the variable to an array. We'll use that array to get the info and append it to log.txt.
                var header = "Artist(s): " + data.tracks.items[j].artists[artistsIndex].name;   
                console.log(header);
                searchOutput.push(header);
                };
            var trackName = "     Track Name: " + data.tracks.items[j].name;
            console.log(trackName);
            searchOutput.push(trackName);
            var preview;
            if (data.tracks.items[j].preview_url) {
                preview = "     Preview: " + data.tracks.items[j].preview_url;
                console.log(preview);
                searchOutput.push(preview);
            } else {
                preview = "     Preview: unavailable";
                console.log(preview);
                searchOutput.push(preview);
            }
            var albulmTitle = "     Album Title: " + data.tracks.items[j].album.name;
            console.log(albulmTitle);
            searchOutput.push(albulmTitle)
        }
        fileMaker();
    })
}

// This function handles the user commande 'movie-this'.
function movieCheck(title) {
    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + title)
        .then(function (movieInfo) {
            searchOutput = [];
            // Again, save a variable, console.log it and then push it to an array which will be user to write to log.txt later.
            var movieData = `Title: ${movieInfo.data.Title}\n     Year Released: ${movieInfo.data.Year}\n     IMDB Rating: ${movieInfo.data.imdbRating}\n     Rotten Tomatoes Rating: ${movieInfo.data.Ratings[1].Value}\n     Producing Country or Countries: ${movieInfo.data.Country}\n     Language: ${movieInfo.data.Language}\n     Plot: ${movieInfo.data.Plot}\n     Actors: ${movieInfo.data.Actors}`;
            console.log(movieData);
            searchOutput.push(movieData);
            fileMaker();
        })
        // Again, I grabbed this error catching portion from one of our class activities.
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

// This function handles the user command "do-what-it-says".
function weirdStuff() {
    // Here we use readFile to grab info from random.txt. It'll provide the command and search item.
    fs.readFile("random.txt","utf8", function (err, data) {
        if (err) {
            return console.log(error);
          }
        // The info we got from random.txt is one big string. .split takes that text and splits it at the comma, giving us each half stored as items in an array.
        var splitText = data.split(",");
        // Now we need to call the items in that new array and save them as variables we can feed to theSwitch.
        command = splitText[0];
        input = splitText[1];
        theSwitch();
    })
}

// This function takes the results from the user's search and appends them to the file log.txt.
function fileMaker() {
    // Remember that array we were pushing to in our earlier functions, searchOutput. In this loop, we'll grab the data from it and append it to log.txt.
    for (var k = 0; k < searchOutput.length; k++)
    // To do the appending we need to use appendFileSync. Since fs is asynchronous, if we just use appendFile, the data will likely appended to log.txt out of order.
    fs.appendFileSync("log.txt", searchOutput[k] + "\n", function(err) {

        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
      
      });
      
}