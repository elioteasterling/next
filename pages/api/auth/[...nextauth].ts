// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const authHandler = (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, authOptions)
export default authHandler

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || ''
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      console.log("when do i get called asked the session callback")
      if (session && session.user) {
        session.user.name  = user.name
        session.user.email = user.email
        session.user.image = user.image
      } 
      return session
    }
  },
}