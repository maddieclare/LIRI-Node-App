require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("file-system");

if (process.argv[2] === "concert-this") {
  let artist = process.argv.slice(3, process.argv.length).join("+");
  concertThis(artist);
} else if (process.argv[2] === "spotify-this-song") {
  let song = process.argv.slice(3, process.argv.length).join(" ");
  spotifyThisSong(song);
} else if (process.argv[2] === "movie-this") {
  let movie = process.argv.slice(3, process.argv.length).join("+");
  movieThis(movie);
} else if (process.argv[2] === "do-what-it-says") {
  doWhatItSays();
} else {
  console.log("\nPlease enter a valid command.\n");
}

function concertThis(artist) {
  console.log("\nSearching for upcoming performances from this artist...");

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
        console.log("I appear to have run into an error. " + err + "\n");
      })
    );
}

function spotifyThisSong(song) {
  console.log("\nSearching for this song on Spotify...");

  let spotify = new Spotify(keys.spotify);

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

          this.printInfo = function() {
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
        if (track === undefined) {
          console.log("\nNo results found.");
          console.log("Here is another song you might enjoy instead:");

          spotify
            .search({ type: "track", query: "the sign ace of base" })
            .then(function(response) {
              let defaultSong = new Song(
                response.tracks.items[0].name,
                response.tracks.items[0].artists[0].name,
                response.tracks.items[0].album.name,
                response.tracks.items[0].external_urls.spotify
              );

              defaultSong.printInfo();
            });
        } else {
          console.log("\nMatch found:");
          let songDetails = new Song(
            response.tracks.items[0].name,
            response.tracks.items[0].artists[0].name,
            response.tracks.items[0].album.name,
            response.tracks.items[0].external_urls.spotify
          );

          songDetails.printInfo();
        }
      })
    )
    .catch(
      (errorInfo = err => {
        console.log("\nI seem to have run into an error. " + err);
      })
    );
}

function movieThis(movie) {
  console.log("\nSearching OMDB for this movie...");

  function Movie(title, year, country, language, actors, plot) {
    this.title = title;
    this.year = year;
    this.country = country;
    this.language = language;
    this.actors = actors;
    this.plot = plot;

    this.getRatings = function(response) {
      console.log("Ratings for this movie:\n");
      response.data.Ratings.forEach(rating =>
        console.log(rating.Source + ": " + rating.Value)
      );
      console.log("\n");
    };

    this.printInfo = function() {
      console.log(
        "\nTitle: " +
          this.title +
          "\nYear: " +
          this.year +
          "\nCountry: " +
          this.country +
          "\nLanguage: " +
          this.language +
          "\nActors: " +
          this.actors +
          "\nPlot synopsis: " +
          this.plot +
          "\n"
      );
    };
  }

  getMovieDetails();

  function getMovieDetails() {
    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=99c37d73";

    axios
      .get(queryUrl)
      .then(
        (movieInfo = response => {
          if (response.data.Title === undefined) {
            getDefaultMovie();
          } else {
            console.log("\nMatch found:");
            let movieDetails = new Movie(
              response.data.Title,
              response.data.Year,
              response.data.Country,
              response.data.Language,
              response.data.Actors,
              response.data.Plot
            );
            movieDetails.printInfo();
            movieDetails.getRatings(response);
          }
        })
      )
      .catch(
        (errorInfo = err => {
          console.log("\nI seem to have run into an error. " + err);
        })
      );
  }

  function getDefaultMovie() {
    let queryUrl = "http://www.omdbapi.com/?t=mr+nobody&apikey=99c37d73";
    axios
      .get(queryUrl)
      .then(function(response) {
        let defaultMovie = new Movie(
          response.data.Title,
          response.data.Year,
          response.data.Country,
          response.data.Language,
          response.data.Actors,
          response.data.Plot
        );
        console.log("\nNo matches found.");
        console.log("Here is another movie you may enjoy instead:");
        defaultMovie.printInfo();
        defaultMovie.getRatings(response);
      })
      .catch(
        (errorInfo = err => {
          console.log("\nI seem to have run into an error. " + err);
        })
      );
  }
}

function doWhatItSays() {
  console.log("\nReading random.txt file...");

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log("\nI seem to have run into an error. " + err);
    }

    if (data.search("concert-this") === 0) {
      let artist = data.slice(14, data.length - 1).replace(" ", "+");
      concertThis(artist);
    } else if (data.search("spotify-this-song") === 0) {
      let song = data.slice(19, data.length - 1);
      spotifyThisSong(song);
    } else if (data.search("movie-this") === 0) {
      let movie = data.slice(12, data.length - 1).replace(" ", "+");
      movieThis(movie);
    } else {
      console.log("\nI'm sorry, Dave. I'm afraid I can't do that.\n");
    }
  });
}
