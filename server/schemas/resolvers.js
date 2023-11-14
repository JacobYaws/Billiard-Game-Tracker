// const { AuthenticationError } = require('apollo-server-express')
// const { User } = require('../models');
// const { signToken } = require('../utils/auth');

// const resolvers = {
//     Query: {
//       // This will query 'me' which will make sure that all data being changed is for the user that is logged in. It will search for the user's data by their _id.
//         me: async (parent, args, context) => {
//           if (context.user) {
//             return User.findOne({ _id: context.user._id });
//           }
//           throw new AuthenticationError('You need to be logged in!');
//         },
//         },

// Mutation: {
//   // This is the mutation used for adding a new user to the database. It requires a username, email, and password. Once successful, the user will be created with a unique authorization token.
//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });
//       const token = signToken(user);
//       return { token, user };
//     },
//     // This is the mutation for logging in, which requires an email and password to verify with the database. If successful, the user will be logged in to their account.
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('No user with this email found!');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect password!');
//       }

//       const token = signToken(user);
//       return { token, user };
//     },

//     // This is the mutation for saving a book to the user's savedBooks array. newBook holds the data for the book to be saved and will be added to the specific user's savedBooks array. runValidators is used to prevent duplicate entries.
//     saveBook: async (parent, { newBook }, context) => {
//       if (context.user) {
//         return User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $addToSet: { savedBooks: newBook } },
//           { new: true, runValidators: true }
//         )
//         }
//         throw new AuthenticationError('You need to be logged in!');
//     },

//     // This is the mutation for removing a book from a user's savedBooks array. It will search the user's savedBooks array and remove the entry that matches with the book-to-be-deleted's bookId.
//     removeBook: async (parent, { bookId }, context) => {
//       if (context.user) {
//         return User.findOneAndUpdate(
//             { _id: context.user._id },
//             { $pull: { savedBooks: { bookId: bookId } } },
//             { new: true }
//         );
//         }
//         throw new AuthenticationError('You need to be logged in!');
//     },
// },
// };

// module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find();
        },

        user: async (parent, { userId }) => {
          return User.findOne({ _id: userId});
        },

        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id });
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        },

Mutation: {
    addUser: async (parent, { email, password, fullname, username }) => {
      const user = await User.create({ email, password, fullname, username });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
},
};

module.exports = resolvers;