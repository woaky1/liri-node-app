require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "concert-this":
        concertCheck(input);
        break;

    default:
        break;
}

function concertCheck(artist){
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            // console.log(response.data);
            console.log(artist + " is playing at:")
            for (var i = 0; i < response.data.length; i++) {
                console.log("*" + response.data[i].venue.name + "*");
                if (response.data[i].venue.region) {
                    console.log("     " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                } else {
                    console.log("     " + response.data[i].venue.city + ", " + response.data[i].venue.country)
                }
            }
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