require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);

// function Spotify(artist) {
//     this.artist = artist
// }

if (process.argv[2] === "concert-this") {
  artist = process.argv.slice(3, process.argv.length).join("+");
  console.log(artist);

  let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log(queryUrl);

  axios.get(queryUrl).then(concertInfo = (response) => {
      
  })
}
