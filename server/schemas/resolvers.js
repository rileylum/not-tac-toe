const { AuthenticationError } = require('apollo-server-express');
const { User, OnlineGame } = require('../models');
const {signToken} = require('../utils/auth');


  const resolvers = {
    Query: {
      user: async(_, {username}) => {
        return User.findOne({username})
      },
      onlineGame: async(_, {_id}) => {
        return OnlineGame.findOne({_id})
      }
    },
    Mutation: {
      login: async(_, {username, password}) => {
        const user = await User.findOne({username});

        if(!user) {
          throw new AuthenticationError("Incorrect username or password")
        }

        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {
          throw new AuthenticationError("Incorrect username or password");
        }

        const token = signToken(user);

        return {token, user}
      },
      addUser: async(_, {username, password}) => {
        const user = await User.create({username, password});

        if(!user) {
          throw new AuthenticationError("Something went wrong! Try again.")
        }
        const token = signToken(user);
        return {token, user}
      },
      incrementWin: async (_, __, context) => {
        console.log(context);
        try {
          const user = await User.findOneAndUpdate({_id: context.user._id}, {$inc: {wins : 1}});
          return user;
        } catch (err) {
          throw new AuthenticationError("An unexpected error occured")
        }
      },
      incrementLoss: async (_, __, context) => {
        try {
          const user = await User.findOneAndUpdate({_id: context.user._id}, {$inc: {losses : 1}});
          return user;
        } catch (err) {
          throw new AuthenticationError("An unexpected error occured")
        }
      },
      createGame: async(_, {boardNum, boardSize, boards}) => {
        try {          
          const game = await OnlineGame.create({boardNum, boardSize, boards});
          return game;
        } catch (err) {
          throw new Error("An error occured", err)
        }
      },
      playerJoin: async(_, {_id, username}) => {
        try{
          const game = await OnlineGame.findOne({_id});
          console.log(game);
          if(!game.playerOne) {
            if (username === "player") {
              game.playerOne = "Player One"
            } else {
              game.playerOne = username
            }
          } else if (!game.playerTwo) {
            if (username === "player") {
              game.playerTwo = "Player Two"
            } else {
              game.playerTwo = username
            }
          } else {
            throw new Error("Game is full")
          }
          game.save();
          return game;
        } catch (err) {
          console.log(err);
          throw new Error("An unexpected error occured")
        }
      },
      playerTurn: async(_, {_id, playerOneNext, boards}) => {
        try{
          const game = await OnlineGame.findOneAndUpdate({_id}, {playerOneNext, boards}, {returnNewObject: true});
          return game;
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  module.exports = resolvers;