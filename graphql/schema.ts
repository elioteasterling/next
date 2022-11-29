// graphql/schema.ts
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers'
import mc from 'micro-cors'
import { RequestHandler } from '../node_modules/@types/micro/index'
import { IncomingMessage, ServerResponse } from 'http'

const cors = mc({
  origin: process.env.ORIGIN,
  allowMethods: ['GET', 'POST']
})

export const typeDefs = `
  type User {
    id: String
    first: String
    last: String
    imageUrl: String
    invitations {
        id
    }
  }

  type Query {
    users: [User]!
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export const handler: RequestHandler = (_req: IncomingMessage, _res: ServerResponse) => {
  startStandaloneServer(server, { listen: { port: 3000 } })
}

export const startServer = cors(handler)

export default startServer
