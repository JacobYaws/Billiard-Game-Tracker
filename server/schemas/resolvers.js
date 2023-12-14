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
    removeAllUsersLobby: async (parent, { lobbyId, users }) => {
      console.log(lobbyId, users)

      return await Lobby.findOneAndUpdate(
        { _id: lobbyId, users: users },
        {
         $set: {users: []},
       },
       {
         new: true,
         runValidators: true,
       }
      )
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
      let ballCount = 16;
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
        numArr = numArr.slice(0, 9)
        console.log("Nineball Array: " + numArr)
      }
      
      let ballsPerUser = (ballCount - 1)/userCount

      if (gametype == 'cutthroat') {
        cutThroatRandomize = true
      }

      let iterations = 0
      while (numArr.length !== 0) {  
      
          
          let type;

          if (cutThroatRandomize) {
            index = Math.floor(Math.random() * numArr.length)

            
            if (iterations % ballsPerUser == 0) {
              console.log("running")
              console.log(iterations);
              console.log(ballsPerUser)
              let assignedUser = await User.findById(users[assignedUserIndex])// assumes users at assignedUserIndex is being passed in as the id of the user
              assignedUserId = assignedUser._id
              assignedUserIndex += 1
            }
          }
            ballValue = numArr[index]
            let color = "";
            // REFACTOR Ball types in the balls array (check in mongoDB) are incorrect. Ex: balls[0].number = 14, type "solid"; balls[0].number = 3, type "stripe"
          if (ballValue > 8 && ballValue <= 15) {
            type = "stripe"
          } else if (ballValue == 8) {
            type = "special" // can change if desired in the future 8 ball: changed from solid to special
          } else {
            type = "solid"
          }

          if (ballValue == 8) {
            color = "#000000"
          }
          if (ballValue == 1 || ballValue == 9) {
            color = "#ffff00"
          }
          if (ballValue == 2 || ballValue == 10) {
            color = "#291dec"
          }
          if (ballValue == 3 || ballValue == 11) {
            color = "#fd0f10"
          }
          if (ballValue == 4 || ballValue == 12) {
            color = "#4c4976"
          } 
          if (ballValue == 5 || ballValue == 13) {
            color = "#f7931e"
          }
          if (ballValue == 6 || ballValue == 14) {
            color = "#36594a"
          }
          if (ballValue == 7 || ballValue == 15) {
            color = "#a2402c"
          }
          
          balls.push({ number: ballValue, type: type, status: false, assigneduser: assignedUserId, color: color});
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
    },
    changeBallStatus: async (parent, { ball, gameId }) => {
        console.log("GameId: " + gameId);
        let number = ball.number;
        let status = ball.status;
        console.log(number)
        console.log(status)
        console.log(ball)
        if (status == true) {
          console.log('true')
        } else if (status == false) {
          console.log('false')
        }
      // console.log(error)
        return await Game.findOneAndUpdate(
          { _id: gameId, "balls.number": ball.number },
          // { _id: gameId, balls: ball },
          // { _id: gameId, balls: { $elemMatch: { $eq: number } }},
          {
           $set: {"balls.$.status": status},
         },
         {
           new: true,
           runValidators: true,
         }
        )
      },
    selectBallStyle: async (parent, { ball, gameId, users }) => {
      
      let ballType = ball[0].type;
      console.log(ballType)
      console.log(gameId)
      console.log(users)
      return await Game.findOneAndUpdate(
        { _id: gameId, "balls.type": ballType, users: users},
        {
          $set: { "balls.$[].assigneduser": users }
        },
        {
          new: true,
          runValidators: true,
        }
      )
    }
},
};

module.exports = resolvers;