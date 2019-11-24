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
        let track = response.tracks.items[0];
        function Song(title, artist, album, link) {
          this.title = title;
          this.artist = artist;
          this.album = album;
          this.linkToSong = link;

          this.printInfo = function printInfo() {
            console.log(
              "\nTitle: " +
                this.title +
                "\nArtist: " +
                this.artist +
                "\nAlbum: " +
                this.album +
                "\nLink: " +
                this.linkToSong +
                "\n"
            );
          };
        }
        track === undefined
          ? spotify
              .search({ type: "track", query: "the sign ace of base" })
              .then(function(response) {
                let defaultSong = new Song(
                  response.tracks.items[0].name,
                  response.tracks.items[0].artists[0].name,
                  response.tracks.items[0].album.name,
                  response.tracks.items[0].external_urls.spotify
                );

                defaultSong.printInfo();
              })
          : console.log("\nMatch found:");
        let songDetails = new Song(
          response.tracks.items[0].name,
          response.tracks.items[0].artists[0].name,
          response.tracks.items[0].album.name,
          response.tracks.items[0].external_urls.spotify
        );

        songDetails.printInfo();
      })
    )
    .catch(
      (errorInfo = err => {
        console.log("\nNo results found.");
      })
    );
}
