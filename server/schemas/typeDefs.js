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
  users: [User]!
  user(userId: ID!): User
  me: User
 
  }

type User {
    _id: ID
    username: String
    email: String
    fullname: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Game {
    _id: ID
    users: [ID!]
    balls: [Ball!]
    gametype: String!
  }

  input Ballinput {
    number: Int!
    type: String!
    status: Boolean!
    assigneduser: ID!
    color: String
  }

  type Ball {
    number: Int!
    type: String!
    status: Boolean!
    assigneduser: ID!
    color: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, fullname: String, username: String!): Auth
    createGame(users: [ID!], gametype: String!): Game
  }
`;

module.exports = typeDefs;