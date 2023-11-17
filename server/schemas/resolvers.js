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
const { User, Ball, Game } = require('../models');
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
    createLobby: async (parent, { users, gametype }) => {
      let maxsize = 2;
      if (gametype == "cutthroat") {
        maxsize = 5
      }
      return Lobby.create({ users, gametype, maxsize })
    },
    // inLobby: async(parent, { some, thing }) => {
    //   let lobbyCount = 0;
      
    //   if (gametype == "cutthroat") {
    //     if (lobbyCount == 3 || lobbyCount == 5) {
    //       return Lobby.create({ users, gametype })
    //     }
    //   } else {
    //     return "Cannot start game"
    //   }
    // }
    createGame: async(parent, { users, gametype }) => {
      const ballCount = 16;
      const balls = [{}];
      let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      let index = 0;
      let cutThroatRandomize = false
      let userCount = users.length
      let ballValue = numArr[index]
      let assignedUserId = null
      let assignedUserIndex = 0

      if (gametype == 'nineball') {
        ballCount = 10;
        numArr.slice(9)
        console.log("Nineball Array: " + numArr)
      }
      
      let ballsPerUser = ballCount/userCount

      if (gametype == 'cutthroat') {
        cutThroatRandomize = true
      }

      let iterations = 0
      while (numArr.length !== 0) {  
      
          
          let type;

          if (cutThroatRandomize) {
            index = Math.floor(Math.random() * numArr.length)
            
            if (iterations % ballsPerUser == 0) {
              assignedUserId = User.findById(users[assignedUserIndex]) // assumes users at assignedUserIndex is being passed in as the id of the user
              assignedUserIndex += 1
            }
          }

          if (ballValue > 8 && ballValue <= 15) {
            type = "stripe"
          } else if (ballValue == 8) {
            type = "solid" // can change if desired in the future 8 ball
          } else {
            type = "solid"
          }

          ballValue = numArr[index]
          
          balls.push({ number: ballValue, type: type, status: false, assigneduser: assignedUserId});
          numArr.splice(index, 1)
          iterations++
        }

        // if want to detect cue ball getting scratched, push cue ball here
        // if (trackCue) {
        //   balls.push({number: 16, type: "Cue", status: false, assigneduser: null})
        // }
        
          return Game.create({ users, balls, gametype })
        
    }
  
},

};

module.exports = resolvers;