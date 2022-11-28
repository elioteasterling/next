// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../client'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  adapter: PrismaAdapter(prisma()),
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (session && session.user) {
        (session.user as any).role = (user as any).role;
        (session.user as any).id = (user as any).id;
      } 
      return session;
    }
  },
};