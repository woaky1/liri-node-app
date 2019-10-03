# liri-node-app

# Liri, the command line entertainment search app!

This is my take on the LIRI assignment for Northwestern's Coding Bootcamp.

LIRI stands for "Language Interpretation and Recognition Interface."

Suppose you want to learn about a song, movie, or if your favorite music act is in town, but you don't want to use Siri because... um... you're in a library and you can't talk. Or you just really like to use command line interfaces. Then LIRI is for you!

## App Organization
The bulk of the app lives in the liri.js file. We also have a text file, random.txt, which stores a special command that will run in certain circumstance. The package.json and package-lock.json have information about the project and can tell you what node packages to install to run Liri. And keys.js holds a pointer to spotify key and secret numbers that are stored in an untracked .env file. You'll need to supply your own spotify key and secret to get the app fully functional.

## How to use Liri

1. First, be sure to navigate to the folder where you've stored the code and run `npm i` to get the node packages you'll need for the app to run correctly.

2. In the same folder, create an .env file with the following in it:
```
    Spotify API keys
    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret
```
Of course, you'll need to sub in your own spotify id and secrect into that code!

3. It's time to run Liri! To do that, go to your terminal/bash window and type:
`node liri.js`

After the file name, you'll need to give Liri a command, then what you'd like that command to search for. There are four commands available.

- `concert-this`:
This command will use the bandsintown.com API via the Axios package to search for the artist or band you provide. It will then show you a list of upcoming show dates and locations, if that artist is on tour.

<iframe src="https://drive.google.com/file/d/1LNtfhm9AUy542r6wrmx7Zrzo7s0Do0pE/preview" width="640" height="480"></iframe>

- `spotify-this-song`:
This command uses the node-spotify-api package to seach to the song you provide. It will show you a list of songs that match that track name or are similar, and even give you a link to a preview if it's available.
- `movie-this`:
This command will use the omdb API via the Axios package to search for information about the movie title you provide.

- `do-what-it-says`:
This is a special mystery command that will run a search based on the contents of random.txt. In this case, it looks up "Power of Love" by Huey Lewis and the News, because Huey Lewis and the News.

4. No matter which command you pick, the results of your search will get saved to a text file, log.txt, so you can always go back and refer to the infomation later.

## Tech used by Liri
- dotenv: This node package allows you to access values from a .env file that you don't store on GIT. So you can keep your spotify key and secret, you know, secret.
- axious: This node package is how we make API calls to omdb and bandsintown.
- moment: We use this node package to translate the concert date date we get from bandsintown into something a little easier for users to read.
- node-spotify-api: This package is what we use to make API calls to spotify.
- fs: File System. This package comes with node. It's used to write our search results to log.txt.

## About Me:
I'm a student at Northwestern's Coding Bootcamp. Liri is a homework assignment at the school. If you poke around GitHub, you're bound to find a bunch of different takes on it. Thanks for stopping by and taking a look at mine!