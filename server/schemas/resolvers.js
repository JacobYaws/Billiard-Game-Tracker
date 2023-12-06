const { AuthenticationError } = require('apollo-server-express')
const { User, Ball, Game, Lobby } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find();
        },
        multipleUsers: async(parent, { userId }) => {
          return User.find({ _id: userId })
        },
        user: async (parent, { userId }) => {
          // console.log(userId)
          return User.findOne({ _id: userId});
        },

        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id });
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        lobby: async(parent, { lobbyId }) => {
          // console.log(lobbyId)
          return Lobby.findOne({ _id: lobbyId })
        },
        game: async(parent, { gameId }) => {
          return Game.findOne({ _id: gameId })
        },
        inGame: async(parent, { userId }) => {
          // console.log("inGame: " + userId)
          if (userId === null) {
            return {}
          }
          return Game.findOne({ users: { $all: [userId] }, status: "inProgress" })
        }
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
    joinLobby: async (parent, { users, lobbyId }) => {
       return await Lobby.findOneAndUpdate(
        { _id: lobbyId },
         {
          $addToSet: { users: users },
        },
        {
          new: true,
          runValidators: true,
        });
    },
    leaveLobby: async (parent, { users, lobbyId }) => {
      return await Lobby.findOneAndUpdate(
        { _id: lobbyId, users: { $elemMatch: { $eq: users } } },
         {
          $pull: { users: users },
        },
        {
          new: true,
          runValidators: true,
        });
    },
    joinGame: async (parent, { users, gameId }) => {
      return await Game.findOneAndUpdate(
        
        { _id: gameId },
        {
         $addToSet: { users: users },
       },
       {
         new: true,
         runValidators: true,
       },
       );
   },
   leaveGame: async (parent, { users, gameId }) => {
     return await Game.findOneAndUpdate(
       { _id: gameId, users: { $elemMatch: { $eq: users } } },
        {
         $pull: { users: users },
       },
       {
         new: true,
         runValidators: true,
       });
   },
    createLobby: async (parent, { users, gametype }) => {
      let maxsize = 2;
      if (gametype == "cutthroat") {
        maxsize = 5
      }
      return await Lobby.create({ users, gametype, maxsize })
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
      const balls = [];
      let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      let index = 0;
      let cutThroatRandomize = false
      let userCount = users.length
      let ballValue = numArr[index]
      let assignedUserId = 0
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
              let assignedUser = await User.findById(users[assignedUserIndex])// assumes users at assignedUserIndex is being passed in as the id of the user
              assignedUserId = assignedUser._id
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
        let status = "inProgress"
        let game = await Game.create({ users, balls, gametype, status })
        return game
    }
},
};

module.exports = resolvers;