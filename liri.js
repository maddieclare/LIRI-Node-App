require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
// var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert-this") {
  let artist = process.argv.slice(3, process.argv.length).join("+");
  console.log(artist);

  let queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  console.log(queryUrl);

  axios.get(queryUrl).then(
    (concertInfo = response => {
      let numberOfResults = response.data.length;
      numberOfResults === 0
        ? console.log("No results found.")
        : console.log(numberOfResults + " results found:");

      for (let i = 0; i < numberOfResults; i++) {
        let venueDetails =
          "Venue name: " +
          response.data[i].venue.name +
          "\nCity: " +
          response.data[i].venue.city +
          ", " +
          response.data[i].venue.country +
          "\nDate: " +
          moment(response.data[i].datetime).format("MM/DD/YYYY") +
          "\n";
        console.log(venueDetails);
      }
    })
  );
}
