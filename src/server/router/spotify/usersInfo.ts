import { createProtectedRouter } from "../protected-router";
import axios from "axios";
import { env } from "../../../env/server.mjs";
import { spotifyApi } from "./spotify";
import { resolve } from "path/posix";
// Example router with queries that can only be hit if the user requesting is signed in

export const userInfo= createProtectedRouter()
  .query("me", {
    async resolve({ ctx }) {
      try {
        spotifyApi.setAccessToken(ctx.session.user?.accessToken);
        const meData = await spotifyApi.getMe();  
        return meData.body
      } catch (error) {
        console.log(error);
      }
    },
  })
  .query("user-playlist",{
    async resolve({ctx}) {
      try {
       const playlistData = await spotifyApi.getUserPlaylists()
       return playlistData.body
      } catch (error) {
        console.log(error)
      }
    }
  })
  .query("get-current-playlist",{
    async resolve({ctx}) {
      try{
      const currentPlayingTrack =  await spotifyApi.getMyCurrentPlayingTrack()
      console.log(currentPlayingTrack)
      return currentPlayingTrack.body
      }
      catch(error) {
        console.log(error)
      }
    }
  })
  ;
