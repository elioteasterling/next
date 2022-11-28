import { ApolloServer, ApolloServerOptions } from '@apollo/server'
import { typeDefs } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import Cors from 'micro-cors'
import { usePrismaContext } from 'graphql/context'

//const context = usePrismaContext({ req: null, res: null})
const server  = new ApolloServer({ typeDefs, resolvers })

export default Cors(async function handler(req: { method: string }, res: { end: () => void }) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await server.start()
})

export const config = {
  api: {
    bodyParser: false,
  }
}
