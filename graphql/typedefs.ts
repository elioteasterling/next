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
