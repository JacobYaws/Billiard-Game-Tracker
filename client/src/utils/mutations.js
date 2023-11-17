// This file contains all of the mutations that will be used for logging in, signing up, and adding and removing a saved book.
import { gql } from '@apollo/client';

// Mutation used for an existing user to login. It checks for an email, password (all required), token, and user with the correct parameters in the database.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation used for user signup. It is used to add a username, email, password (all required), token and user with the correct parameters in the database.
export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $fullname: String, $username: String!) {
    addUser(email: $email, password: $password, fullname: $fullname, username: $username) {
      token
      user {
        _id
        username
        fullname
        email
      }
    }
  }
`;


// Potential problem? 
// export const CREATE_GAME = gql`
//   mutation createGame($users: [ID!], $balls: [Ballinput!], $gametype: String!) {
//     createGame(users: $users, balls: $balls, gametype: $gametype) {
//       game {
//         users
//         balls
//         gametype
//       }
//     }
//   }
// `

export const CREATE_GAME = gql`
  mutation createGame($users: [ID!], $gametype: String!) {
    createGame(users: $users, gametype: $gametype) {
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
  }
`





// This block belongs in the ADD_USER mutation, placed below email (user)
// bookCount
        // savedBooks {
        //   authors
        //   bookId
        //   image
        //   link
        //   title
        //   description
        // }

// // Mutation used for saving a book. It is used to add a new bookId to the savedBooks array.
// export const SAVE_BOOK = gql`
//   mutation saveBook($newBook: SavedBookInput!) {
//     saveBook(newBook: $newBook) {
//       _id
//       username
//       email
//       savedBooks {
//             bookId
//             authors
//             description
//             title
//             image
//             link
//       }
//     }
//   }
// `;

// // Mutation used for deleting a book. It is used to remove a specific bookId from the savedBooks array.
// export const REMOVE_BOOK = gql`
//   mutation removeBook($bookId: ID!) {
//     removeBook(bookId: $bookId) {
//         _id
//         username
//         email
//         bookCount
//         savedBooks {
//               bookId
//               authors
//               description
//               title
//               image
//               link
//         }
//     }
//   }
// `;