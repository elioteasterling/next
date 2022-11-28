// /graphql/context.ts
import { PrismaClient } from '@prisma/client'
import { prisma } from 'pages/api/client'

export type GraphqlContext = {
  prisma: PrismaClient
}

export async function usePrismaContext({ req, res }): Promise<GraphqlContext> {
  return {
    prisma: prisma()
  }
}
