import { gql } from '@apollo/client';

// Query to get the user's account parameters, which will be used when deleting books.
export const QUERY_ME = gql`
   {
      me {
      _id
      username
      email
    }
  }
`;

export const QUERY_STATUS = gql`
query inGame($userId: ID) {
  inGame(userId: $userId) {
    _id
  }
}`

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
    }
  }`

  export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
    }
  }
`;

export const QUERY_MULTIPLE_USERS = gql`
query multipleUsers($userId: [ID]!) {
  multipleUsers(userId: $userId) {
    _id
    username
  }
}
`;

export const QUERY_SINGLE_LOBBY = gql`
query singleLobby($lobbyId: ID!) {
  lobby(lobbyId: $lobbyId) {
    _id
    users
    gametype
    maxsize
  }
}`

export const QUERY_SINGLE_GAME = gql`
query singleGame($gameId: ID!) {
  game(gameId: $gameId) {
    _id
    users
    balls {
      number
        type
        status
        assigneduser
        color
      }
    
    gametype
  }
}`