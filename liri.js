require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

if (process.argv[2] === "concert-this") {
  let artist = process.argv.slice(3, process.argv.length).join("+");

  let queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(
      (concertInfo = response => {
        let numberOfResults = response.data.length;
        numberOfResults === 0
          ? console.log("\nNo results found.\n")
          : console.log("\n" + numberOfResults + " results found:\n");

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
    )
    .catch(
      (errorInfo = err => {
        console.log("\nError occurred: " + err + "\n");
      })
    );
} else if (process.argv[2] === "spotify-this-song") {
  let song = process.argv.slice(3, process.argv.length).join(" ");

  let spotify = new Spotify({
    id: "3bb15c6190ec489db0b55cde9d33ab58",
    secret: "f8f725a3aa4d446eb47d7b281e72fd98"
  });

  spotify
    .search({ type: "track", query: song })
    .then(
      (songInfo = response => {
        response.tracks.items[0] === undefined
          ? spotify
              .search({ type: "track", query: "the sign ace of base" })
              .then(function(response) {
                let songDetails =
                  "\nTitle: " +
                  response.tracks.items[0].name +
                  "\nArtist: " +
                  response.tracks.items[0].artists[0].name +
                  "\nAlbum: " +
                  response.tracks.items[0].album.name +
                  "\nLink: " +
                  response.tracks.items[0].external_urls.spotify +
                  "\n";
                console.log(songDetails);
              })
          : console.log("\nMatch found:");
        let songDetails =
          "\nTitle: " +
          response.tracks.items[0].name +
          "\nArtist: " +
          response.tracks.items[0].artists[0].name +
          "\nAlbum: " +
          response.tracks.items[0].album.name +
          "\nLink: " +
          response.tracks.items[0].external_urls.spotify +
          "\n";
        console.log(songDetails);
      })
    )
    .catch(
      (errorInfo = err => {
        console.log("\nError occurred: " + err);
      })
    );
}
