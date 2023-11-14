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
      name
      skills
    }
  }
`;