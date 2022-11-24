// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma'

const authHandler = (req, res) => NextAuth(req, res, authOptions)
export default authHandler

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || ''
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    async signIn(_ /*{ user, account, profile, email, credentials }*/) { return true },
    async session({ session, _, user }) {
      if (session && session.user) {
        session.user.role = user.role
        session.user.id = user.id
      } 
      return session
    }
  },
}