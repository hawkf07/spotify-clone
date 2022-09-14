import { createProtectedRouter } from "../protected-router";
import axios from "axios";
import { env } from "../../../env/server.mjs";
import {spotifyApi} from './spotify'
import { resolve } from "path/posix";
// Example router with queries that can only be hit if the user requesting is signed in

export const getMusic = createProtectedRouter()
  .query("getMusic", {
    resolve({ ctx }) {
      return "hello world from music";
    },
  })
  .query("me",{
    async resolve({ctx}) {
      try{
      spotifyApi.setAccessToken(ctx.session.user?.accessToken)
      const meData = spotifyApi.getMe()
      return (await meData).body
      }
      catch(error) {
        console.log(error)
        return error
      }
    }
  })