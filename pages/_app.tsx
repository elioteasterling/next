import 'styles/tailwind.css'
import Layout from '../components/Layout'
import { ApolloProvider, gql, useQuery } from '@apollo/client'
import apolloClient from 'lib/apollo'

const usergql = gql`
  query {
    users {
      id
      imageUrl
      email
    }
  }
`

export const gclient = () => useQuery(usergql)

export default function AppShell({ Component, pageProps }) {
    return (
        <ApolloProvider client={apolloClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}
