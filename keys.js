// This file tells liri.js where to find our spotify key and secret, which are stored in an untracked .env file.

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};