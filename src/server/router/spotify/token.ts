import { createProtectedRouter } from "../protected-router";
import axios from "axios";
import { env } from "../../../env/server.mjs";
import { spotifyApi } from "./spotify";
import { resolve } from "path/posix";
// Example router with queries that can only be hit if the user requesting is signed in

export const token= createProtectedRouter()
  .mutation("refresh-token", {
    resolve({ ctx }) {
      spotifyApi.setAccessToken(ctx.session.user?.accessToken)
      spotifyApi.refreshAccessToken()
    },
  })
