import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "../../../env/server.mjs";
import SpotifyProvider from 'next-auth/providers/spotify'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from '../../../server/router/prisma'
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter:PrismaAdapter(prisma)
  ,

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
