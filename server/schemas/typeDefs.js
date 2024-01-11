const { gql } = require('apollo-server-express');
const typeDefs = gql`

type Query {
  users: [User]!
  multipleUsers(userId: [ID]!): [User]
  user(userId: ID!): User
  me: User
  game(gameId: ID!): Game
  lobby(lobbyId: ID!): Lobby
  inGame(userId: ID): Game
  inLobby(userId: ID): Lobby
  multipleGames(userId: ID!): [Game]
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
    status: String!
  }

  type Lobby {
    _id: ID
    users: [ID!]
    gametype: String!
    maxsize: Int!
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
    createLobby(users: [ID!], gametype: String!): Lobby
    joinGame(users: ID!, gameId: ID!): Game
    joinLobby(users: ID!, lobbyId: ID!): Lobby
    leaveGame(users: ID!, gameId: ID!): Game
    leaveLobby(users: ID!, lobbyId: ID!): Lobby
    removeAllUsersLobby(lobbyId: ID!, users: [ID!]): Lobby
    changeBallStatus(gameId: ID!, ball: Ballinput): Game
    selectBallStyle(gameId: ID!, ball: [Ballinput], users: ID!): Game
    closeGame(gameId: ID!, status: String!): Game
    updateGameType(lobbyId: ID!, gametype: String!): Lobby
  }
`;

module.exports = typeDefs;