// graphql/schema.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers'
import Cors from 'micro-cors'

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

export const go = async () => await Cors(startStandaloneServer(server, {
  listen: { port: 4000 },
}))
