# LIRI Bot Assignment

## Overview

This app takes in command line parameters and returns information to the user about movies, bands and/or songs.

User input should be structures as follows: **node liri [command here] [search parameters]**

The four commands the app takes are as follows:

1. **concert-this**: Returns upcoming music events for the band or artist specified.
  For example, *node liri spotify-this celine dion* returns information on upcoming Celine Dion concerts in the following format:

  * 96 results found:
  
  * Venue name: United Center
  * City: Chicago, United States
  * Date: 12/01/2019 *(MM/DD/YYYY format)*

  (...)

2. **spotify-this-song**: Returns information on the song specified by the user.
  For example, *node liri spotify-this-song highway to hell* returns song information based on the user's search in the following format:

  * Title of song: Highway to Hell
  * Artist: AC/DC
  * Album: Highway to Hell
  * Link: https://open.spotify.com/track/2zYzyRzz6pRmhPzyfMEC8s

3. **movie-this**: Returns information on the movie specified by the user.
For example, *node liri movie-this what we do in the shadows* returns movie information based on the user's search in the following format:

  * Title: What We Do in the Shadows
  * Year: 2014
  * Country: New Zealand
  * Language: English, German, Spanish
  * Actors: Jemaine Clement, Taika Waititi, Jonny Brugh, Cori Gonzalez-Macuer
  * Plot synopsis: Viago, Deacon and Vladislav are vampires who are finding that modern life has them struggling with the mundane - like paying rent, keeping up with the chore wheel, trying to get into nightclubs and overcoming flatmate conflicts.
  
  * Ratings for this movie:
  
  * Internet Movie Database: 7.7/10
  * Rotten Tomatoes: 96%
  * Metacritic: 76/100

4. **do-what-it-says**: Runs whatever command is specified inside random.txt. For example, if random.txt contains *movie-this friday the 13th*, LIRI runs the movieThis function with *friday+the+13th* as the search parameter. This works for all commands except *do-what-it-says*, which returns an error. 

### Link to video demonstration:
https://www.youtube.com/watch?v=mRNRD6xy1NE

### Link to GitHub repo
https://github.com/maddieclare/liri-node-app

## Technologies used

  * Node.js, including the following packages:
     ** axios (**https://www.npmjs.com/package/axios**)
     ** spotify (**https://www.npmjs.com/package/spotify**)
     ** moment (**https://www.npmjs.com/package/moment**)
     ** fs (**https://www.npmjs.com/package/file-system**)
