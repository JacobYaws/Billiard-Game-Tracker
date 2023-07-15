import { gql } from '@apollo/client';

// Query to get the user's account parameters, which will be used when deleting books.
export const GET_ME = gql`
   {
      me {
      _id
      username
      email
    //   bookCount
    //   savedBooks {
    //     bookId
    //     authors
    //     description
    //     title
    //     image
    //     link
    //   }
    }
  }
`;