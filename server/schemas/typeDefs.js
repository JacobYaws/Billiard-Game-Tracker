// const { gql } = require('apollo-server-express');
// // These are the type definitiions that will be used when querying data with graphql. This is used to ensure that the correct data is being passed through when using mutations.
// const typeDefs = gql`

// type Query {
//     me: User
//   }

//   input SavedBookInput {
//     bookId: String
//     authors: [String]
//     description: String
//     title: String
//     image: String
//     link: String
//   }

//   type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     saveBook(newBook: SavedBookInput!): User
//     removeBook(bookId: ID!): User
//   }

// type User {
//     _id: ID!
//     username: String!
//     email: String!
//     bookCount: Int
//     savedBooks: [Book]
//   }

// type Book {
//     bookId: ID!
//     authors: [String]
//     description: String
//     title: String
//     image: String
//     link: String
// }

//   type Auth {
//     token: ID!
//     user: User
//   }
// `;

// module.exports = typeDefs;

const { gql } = require('apollo-server-express');
const typeDefs = gql`

type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;