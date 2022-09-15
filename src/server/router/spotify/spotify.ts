import { env } from "../../../env/server.mjs";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
});

export { spotifyApi };
