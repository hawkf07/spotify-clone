import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "../../../env/server.mjs";
import SpotifyProvider from 'next-auth/providers/spotify'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from '../../../server/router/prisma'
import {spotifyApi} from '../../../server/router/spotify/spotify'


async function refreshSpotifyAccessToken(token) {
  try {
      spotifyApi.setAccessToken(token.accessToken)
      spotifyApi.setRefreshToken(token.refreshToken)

      const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
      console.log("REFRESHED TOKEN IS", refreshedToken)

      return {
          ...token,
          accessToken: refreshedToken.access_token,
          accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify API
          refreshToken: refreshedToken.refresh_token ?? token.refreshToken
      }
  } catch (error) {
      console.error(error)

      return {
          ...token,
          error: "RefreshAccessTokenError"
      }
  }
}

// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://accounts.spotify.com/api/token?" +
//       new URLSearchParams({
//         client_id: env.SPOTIFY_CLIENT_ID,
//         client_secret: env.SPOTIFY_CLIENT_SECRET,
//         grant_type: "authorization_code",
//         refresh_token: token.refreshToken,
//         code:env.CODE,
//       })

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     })

//     const refreshedTokens = await response.json()

//     if (!response.ok) {
//       throw refreshedTokens
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     }
//   } catch (error) {
//     console.log(error)

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     }
//   }
// }


export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user,token }) {
      if (session.user) { 
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.name = token.name
      }
      
      return session;
    },
    async jwt({token,user,account}) {
       // initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    name: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000
                }
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING ACCESS TOKEN IS VALID!")
                return token
            }
            // refresh access token (imagine having a expired token pfff)
            console.log("ACCESS TOKEN HAS EXPIRED! REFRESHING...")
            return await refreshSpotifyAccessToken(token)        
    },
    
  },
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId:env.SPOTIFY_CLIENT_ID,
      clientSecret:env.SPOTIFY_CLIENT_SECRET, 
    })
    // ...add more providers here
  ],
  
};

export default NextAuth(authOptions);
